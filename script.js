// Main JavaScript file for the website

// Global variables
let currentHeroSlide = 0
let heroSlides = []

// Initialize the website
document.addEventListener("DOMContentLoaded", () => {
  initializeHeader()
  initializeHeroBanner()
  loadMovieRows()
  initializeMobileMenu()
})

// Header functionality
function initializeHeader() {
  const header = document.getElementById("header")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.remove("bg-gradient-to-b", "from-black/80", "to-transparent")
      header.classList.add("bg-black/95", "backdrop-blur-xl", "border-b", "border-gray-800")
    } else {
      header.classList.add("bg-gradient-to-b", "from-black/80", "to-transparent")
      header.classList.remove("bg-black/95", "backdrop-blur-xl", "border-b", "border-gray-800")
    }
  })
}

// Hero banner functionality
function initializeHeroBanner() {
  const featuredMovies = window.movieData.getFeaturedMovies().slice(0, 5)
  const heroSlider = document.getElementById("hero-slider")
  const heroTitle = document.getElementById("hero-title")
  const heroDescription = document.getElementById("hero-description")

  if (!featuredMovies.length) return

  heroSlides = featuredMovies

  // Create hero slides
  featuredMovies.forEach((movie, index) => {
    const slide = document.createElement("div")
    slide.className = `hero-slide ${index === 0 ? "active" : ""}`
    slide.style.backgroundImage = `url(${movie.backdrop || movie.poster})`
    heroSlider.appendChild(slide)
  })

  // Update hero content
  function updateHeroContent() {
    const currentMovie = heroSlides[currentHeroSlide]
    heroTitle.textContent = currentMovie.title
    heroDescription.textContent = currentMovie.description
  }

  updateHeroContent()

  // Auto-rotate hero slides
  setInterval(() => {
    const slides = document.querySelectorAll(".hero-slide")
    slides[currentHeroSlide].classList.remove("active")

    currentHeroSlide = (currentHeroSlide + 1) % heroSlides.length

    slides[currentHeroSlide].classList.add("active")
    updateHeroContent()
  }, 5000)
}

// Load movie rows
function loadMovieRows() {
  loadTrendingMovies()
  loadNewMovies()
  loadActionMovies()
  loadComedyMovies()
}

function loadTrendingMovies() {
  const container = document.getElementById("trending-movies")
  const movies = window.movieData.getTrendingMovies()
  renderMovieGrid(container, movies)
}

function loadNewMovies() {
  const container = document.getElementById("new-movies")
  const movies = window.movieData.getNewMovies()
  renderMovieGrid(container, movies)
}

function loadActionMovies() {
  const container = document.getElementById("action-movies")
  const movies = window.movieData.getMoviesByGenre("Action").slice(0, 8)
  renderMovieGrid(container, movies)
}

function loadComedyMovies() {
  const container = document.getElementById("comedy-movies")
  const movies = window.movieData.getMoviesByGenre("Comedy").slice(0, 8)
  renderMovieGrid(container, movies)
}

// Render movie grid
function renderMovieGrid(container, movies) {
  if (!container || !movies.length) return

  container.innerHTML = movies
    .map(
      (movie) => `
        <div class="movie-card" onclick="goToMovie('${movie.slug}')">
            <div class="relative">
                <img src="${movie.poster}" alt="${movie.title}" loading="lazy">
                <div class="quality-badge">${movie.quality}</div>
                <div class="rating-badge">
                    <i class="fas fa-star text-yellow-400"></i>
                    ${movie.rating}
                </div>
                <div class="overlay">
                    <div class="play-button">
                        <i class="fas fa-play"></i>
                    </div>
                </div>
            </div>
            <div class="movie-info">
                <div class="movie-title">${movie.title}</div>
                <div class="movie-meta">
                    <span>${movie.year}</span>
                    <span>${movie.duration}</span>
                </div>
            </div>
        </div>
    `,
    )
    .join("")
}

// Mobile menu functionality
function initializeMobileMenu() {
  // Mobile menu is handled by toggleMobileMenu function
}

function toggleMobileMenu() {
  const mobileMenu = document.getElementById("mobile-menu")
  const menuIcon = document.getElementById("mobile-menu-icon")

  if (mobileMenu.classList.contains("hidden")) {
    mobileMenu.classList.remove("hidden")
    menuIcon.classList.remove("fa-bars")
    menuIcon.classList.add("fa-times")
  } else {
    mobileMenu.classList.add("hidden")
    menuIcon.classList.remove("fa-times")
    menuIcon.classList.add("fa-bars")
  }
}

// Navigation functions
function goToMovie(slug) {
  window.location.href = `movie.html?slug=${slug}`
}

function goBack() {
  if (window.history.length > 1) {
    window.history.back()
  } else {
    window.location.href = "index.html"
  }
}

// Search functionality
function toggleSearch() {
  window.location.href = "search.html"
}

// Utility functions
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
}

// Get URL parameters
function getUrlParameter(name) {
  const urlParams = new URLSearchParams(window.location.search)
  return urlParams.get(name)
}

// Format duration
function formatDuration(minutes) {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
}

// Format file size
function formatFileSize(bytes) {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
  if (bytes === 0) return "0 Byte"
  const i = Number.parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
  return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + " " + sizes[i]
}

// Show loading state
function showLoading(container) {
  if (container) {
    container.innerHTML = `
            <div class="text-center py-8">
                <div class="loading-spinner mx-auto mb-4"></div>
                <div class="text-white">Loading...</div>
            </div>
        `
  }
}

// Show error state
function showError(container, message = "Something went wrong") {
  if (container) {
    container.innerHTML = `
            <div class="text-center py-8">
                <div class="text-6xl mb-4">😞</div>
                <div class="text-white text-xl mb-2">Oops!</div>
                <div class="text-gray-400">${message}</div>
            </div>
        `
  }
}

// Debounce function for search
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Local storage helpers
function saveToLocalStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (error) {
    console.error("Error saving to localStorage:", error)
  }
}

function getFromLocalStorage(key) {
  try {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : null
  } catch (error) {
    console.error("Error reading from localStorage:", error)
    return null
  }
}

// Toast notification system
function showToast(message, type = "info") {
  const toast = document.createElement("div")
  toast.className = `fixed top-4 right-4 z-50 px-6 py-3 rounded-lg text-white font-medium transition-all duration-300 transform translate-x-full`

  switch (type) {
    case "success":
      toast.classList.add("bg-green-600")
      break
    case "error":
      toast.classList.add("bg-red-600")
      break
    case "warning":
      toast.classList.add("bg-yellow-600")
      break
    default:
      toast.classList.add("bg-blue-600")
  }

  toast.textContent = message
  document.body.appendChild(toast)

  // Animate in
  setTimeout(() => {
    toast.classList.remove("translate-x-full")
  }, 100)

  // Animate out and remove
  setTimeout(() => {
    toast.classList.add("translate-x-full")
    setTimeout(() => {
      document.body.removeChild(toast)
    }, 300)
  }, 3000)
}

// Initialize tooltips (if needed)
function initializeTooltips() {
  const tooltipElements = document.querySelectorAll("[data-tooltip]")
  tooltipElements.forEach((element) => {
    element.addEventListener("mouseenter", showTooltip)
    element.addEventListener("mouseleave", hideTooltip)
  })
}

function showTooltip(event) {
  const element = event.target
  const tooltipText = element.getAttribute("data-tooltip")

  const tooltip = document.createElement("div")
  tooltip.className = "absolute z-50 px-2 py-1 text-sm text-white bg-gray-900 rounded shadow-lg"
  tooltip.textContent = tooltipText
  tooltip.id = "tooltip"

  document.body.appendChild(tooltip)

  const rect = element.getBoundingClientRect()
  tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + "px"
  tooltip.style.top = rect.top - tooltip.offsetHeight - 5 + "px"
}

function hideTooltip() {
  const tooltip = document.getElementById("tooltip")
  if (tooltip) {
    document.body.removeChild(tooltip)
  }
}
