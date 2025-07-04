// Main JavaScript for CINESTREAM website

// Global variables
let currentSlide = 0
const isSearchVisible = false

// Initialize the website
document.addEventListener("DOMContentLoaded", () => {
  initializeHeroSlider()
  loadMovieRows()
  initializeSearch()
  initializeMobileMenu()
  initializeScrollEffects()
})

// Hero slider functionality
function initializeHeroSlider() {
  const heroSlider = document.getElementById("hero-slider")
  if (!heroSlider) return

  const featuredMovies = window.movieData.getFeaturedMovies().slice(0, 5)

  featuredMovies.forEach((movie, index) => {
    const slide = document.createElement("div")
    slide.className = `hero-slide ${index === 0 ? "active" : ""}`
    slide.style.backgroundImage = `url(${movie.backdrop || movie.poster})`
    slide.innerHTML = `
      <div class="hero-content">
        <h1 class="hero-title">${movie.title}</h1>
        <p class="hero-description">${movie.description}</p>
        <div class="hero-actions">
          <button onclick="goToMovie('${movie.slug}')" class="btn-primary">
            <i class="fas fa-play"></i> Watch Now
          </button>
          <button onclick="goToMovie('${movie.slug}')" class="btn-secondary">
            <i class="fas fa-info-circle"></i> More Info
          </button>
        </div>
      </div>
    `
    heroSlider.appendChild(slide)
  })

  // Auto-advance slides
  setInterval(() => {
    nextSlide()
  }, 5000)
}

function nextSlide() {
  const slides = document.querySelectorAll(".hero-slide")
  if (slides.length === 0) return

  slides[currentSlide].classList.remove("active")
  currentSlide = (currentSlide + 1) % slides.length
  slides[currentSlide].classList.add("active")
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
  if (!container) return

  const movies = window.movieData.getTrendingMovies().slice(0, 12)
  renderMovieGrid(container, movies)
}

function loadNewMovies() {
  const container = document.getElementById("new-movies")
  if (!container) return

  const movies = window.movieData.getNewMovies().slice(0, 12)
  renderMovieGrid(container, movies)
}

function loadActionMovies() {
  const container = document.getElementById("action-movies")
  if (!container) return

  const movies = window.movieData.getMoviesByGenre("Action").slice(0, 12)
  renderMovieGrid(container, movies)
}

function loadComedyMovies() {
  const container = document.getElementById("comedy-movies")
  if (!container) return

  const movies = window.movieData.getMoviesByGenre("Comedy").slice(0, 12)
  renderMovieGrid(container, movies)
}

// Render movie grid
function renderMovieGrid(container, movies) {
  if (!container || !movies.length) return

  container.innerHTML = movies
    .map(
      (movie) => `
        <div class="movie-card" onclick="goToMovie('${movie.slug}')">
            <div class="movie-poster">
                <img src="${movie.poster}" alt="${movie.title}" loading="lazy">
                <div class="movie-overlay">
                    <div class="play-button">
                        <i class="fas fa-play"></i>
                    </div>
                    <div class="movie-info-overlay">
                        <div class="movie-title">${movie.title}</div>
                        <div class="movie-meta">
                            <span class="quality">${movie.quality}</span>
                            <span class="rating">
                                <i class="fas fa-star"></i>
                                ${movie.rating}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    )
    .join("")
}

// Navigation functions
function goToMovie(slug) {
  window.location.href = `movie.html?slug=${slug}`
}

function goToPage(page) {
  window.location.href = `${page}.html`
}

// Search functionality
function initializeSearch() {
  const searchInput = document.getElementById("search-input")
  const searchResults = document.getElementById("search-results")

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const query = this.value.trim()
      if (query.length > 2) {
        performSearch(query)
      } else {
        hideSearchResults()
      }
    })

    searchInput.addEventListener("focus", function () {
      if (this.value.trim().length > 2) {
        showSearchResults()
      }
    })

    // Hide search results when clicking outside
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".search-container")) {
        hideSearchResults()
      }
    })
  }
}

function performSearch(query) {
  const results = window.movieData.searchMovies(query)
  displaySearchResults(results.slice(0, 8))
}

function displaySearchResults(results) {
  const searchResults = document.getElementById("search-results")
  if (!searchResults) return

  if (results.length === 0) {
    searchResults.innerHTML = `
      <div class="search-no-results">
        <i class="fas fa-search"></i>
        <p>No movies found</p>
      </div>
    `
  } else {
    searchResults.innerHTML = results
      .map(
        (movie) => `
          <div class="search-result-item" onclick="goToMovie('${movie.slug}')">
              <img src="${movie.poster}" alt="${movie.title}">
              <div class="search-result-info">
                  <div class="search-result-title">${movie.title}</div>
                  <div class="search-result-meta">
                      <span>${movie.year}</span>
                      <span>${movie.quality}</span>
                      <span><i class="fas fa-star"></i> ${movie.rating}</span>
                  </div>
              </div>
          </div>
      `,
      )
      .join("")
  }

  showSearchResults()
}

function showSearchResults() {
  const searchResults = document.getElementById("search-results")
  if (searchResults) {
    searchResults.classList.add("visible")
  }
}

function hideSearchResults() {
  const searchResults = document.getElementById("search-results")
  if (searchResults) {
    searchResults.classList.remove("visible")
  }
}

function toggleSearch() {
  const searchContainer = document.querySelector(".search-container")
  if (searchContainer) {
    searchContainer.classList.toggle("active")
    if (searchContainer.classList.contains("active")) {
      const searchInput = document.getElementById("search-input")
      if (searchInput) {
        searchInput.focus()
      }
    }
  }
}

// Mobile menu functionality
function initializeMobileMenu() {
  // Mobile menu is handled by toggleMobileMenu function
}

function toggleMobileMenu() {
  const mobileMenu = document.getElementById("mobile-menu")
  const menuIcon = document.getElementById("mobile-menu-icon")

  if (mobileMenu && menuIcon) {
    mobileMenu.classList.toggle("hidden")

    if (mobileMenu.classList.contains("hidden")) {
      menuIcon.className = "fas fa-bars"
    } else {
      menuIcon.className = "fas fa-times"
    }
  }
}

// Scroll effects
function initializeScrollEffects() {
  const header = document.getElementById("header")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }
  })
}

// Utility functions
function formatViews(views) {
  if (views >= 1000000) {
    return (views / 1000000).toFixed(1) + "M"
  } else if (views >= 1000) {
    return (views / 1000).toFixed(1) + "K"
  }
  return views.toString()
}

function showToast(message, type = "info") {
  const toast = document.createElement("div")
  toast.className = `toast toast-${type}`
  toast.textContent = message

  document.body.appendChild(toast)

  setTimeout(() => {
    toast.classList.add("show")
  }, 100)

  setTimeout(() => {
    toast.classList.remove("show")
    setTimeout(() => {
      if (document.body.contains(toast)) {
        document.body.removeChild(toast)
      }
    }, 300)
  }, 3000)
}

// Error handling
window.addEventListener("error", (e) => {
  console.error("JavaScript error:", e.error)
})

// Loading state management
function showLoading(element) {
  if (element) {
    element.innerHTML = `
      <div class="loading-spinner">
        <i class="fas fa-spinner fa-spin"></i>
        <p>Loading...</p>
      </div>
    `
  }
}

function hideLoading(element) {
  if (element) {
    const spinner = element.querySelector(".loading-spinner")
    if (spinner) {
      spinner.remove()
    }
  }
}
