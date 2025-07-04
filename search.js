// Search page JavaScript

let currentFilters = {
  genres: [],
  yearRange: [1990, 2025],
  ratingRange: [0, 10],
  quality: [],
}

let currentSearchQuery = ""
let currentPage = 1
const itemsPerPage = 20

document.addEventListener("DOMContentLoaded", () => {
  initializeSearchPage()
  initializeFilters()
  loadInitialResults()
})

function initializeSearchPage() {
  const searchInput = document.getElementById("search-input")
  const searchButton = document.getElementById("search-button")

  if (searchInput) {
    searchInput.addEventListener("input", debounce(handleSearchInput, 300))
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        performSearch()
      }
    })
  }

  if (searchButton) {
    searchButton.addEventListener("click", performSearch)
  }

  // Get search query from URL if present
  const urlParams = new URLSearchParams(window.location.search)
  const query = urlParams.get("q")
  if (query) {
    currentSearchQuery = query
    if (searchInput) {
      searchInput.value = query
    }
    performSearch()
  }
}

function initializeFilters() {
  initializeGenreFilters()
  initializeYearFilter()
  initializeRatingFilter()
  initializeQualityFilter()
}

function initializeGenreFilters() {
  const genreContainer = document.getElementById("genre-filters")
  if (!genreContainer) return

  const genres = [
    "Action",
    "Comedy",
    "Drama",
    "Horror",
    "Thriller",
    "Sci-Fi",
    "Romance",
    "Animation",
    "Crime",
    "Adventure",
  ]

  genreContainer.innerHTML = genres
    .map(
      (genre) => `
        <label class="filter-checkbox">
            <input type="checkbox" value="${genre}" onchange="updateGenreFilter('${genre}', this.checked)">
            <span class="checkmark"></span>
            ${genre}
        </label>
    `,
    )
    .join("")
}

function initializeYearFilter() {
  const yearSlider = document.getElementById("year-slider")
  if (!yearSlider) return

  // Initialize year range slider (would need a slider library in real implementation)
  yearSlider.innerHTML = `
    <div class="range-slider">
        <input type="range" min="1990" max="2025" value="1990" id="year-min" onchange="updateYearFilter()">
        <input type="range" min="1990" max="2025" value="2025" id="year-max" onchange="updateYearFilter()">
        <div class="range-values">
            <span id="year-min-value">1990</span> - <span id="year-max-value">2025</span>
        </div>
    </div>
  `
}

function initializeRatingFilter() {
  const ratingSlider = document.getElementById("rating-slider")
  if (!ratingSlider) return

  ratingSlider.innerHTML = `
    <div class="range-slider">
        <input type="range" min="0" max="10" step="0.1" value="0" id="rating-min" onchange="updateRatingFilter()">
        <input type="range" min="0" max="10" step="0.1" value="10" id="rating-max" onchange="updateRatingFilter()">
        <div class="range-values">
            <span id="rating-min-value">0</span> - <span id="rating-max-value">10</span>
        </div>
    </div>
  `
}

function initializeQualityFilter() {
  const qualityContainer = document.getElementById("quality-filters")
  if (!qualityContainer) return

  const qualities = ["4K", "HD", "WEBRip"]

  qualityContainer.innerHTML = qualities
    .map(
      (quality) => `
        <label class="filter-checkbox">
            <input type="checkbox" value="${quality}" onchange="updateQualityFilter('${quality}', this.checked)">
            <span class="checkmark"></span>
            ${quality}
        </label>
    `,
    )
    .join("")
}

function handleSearchInput(event) {
  currentSearchQuery = event.target.value.trim()
  if (currentSearchQuery.length > 0) {
    performSearch()
  } else {
    loadInitialResults()
  }
}

function performSearch() {
  currentPage = 1
  const results = window.movieData.searchMovies(currentSearchQuery, currentFilters)
  displayResults(results)
  updateURL()
}

function loadInitialResults() {
  const allMovies = window.movieData.getAllMovies()
  displayResults(allMovies)
}

function displayResults(results) {
  const resultsContainer = document.getElementById("search-results")
  const resultsCount = document.getElementById("results-count")

  if (!resultsContainer) return

  // Update results count
  if (resultsCount) {
    resultsCount.textContent = `${results.length} movies found`
  }

  if (results.length === 0) {
    resultsContainer.innerHTML = `
      <div class="no-results">
          <i class="fas fa-search text-6xl text-gray-600 mb-4"></i>
          <h3 class="text-2xl font-bold text-white mb-2">No movies found</h3>
          <p class="text-gray-400">Try adjusting your search criteria</p>
      </div>
    `
    return
  }

  // Paginate results
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedResults = results.slice(startIndex, endIndex)

  resultsContainer.innerHTML = paginatedResults
    .map(
      (movie) => `
        <div class="search-result-card" onclick="goToMovie('${movie.slug}')">
            <div class="movie-poster">
                <img src="${movie.poster}" alt="${movie.title}" loading="lazy">
                <div class="movie-overlay">
                    <div class="play-button">
                        <i class="fas fa-play"></i>
                    </div>
                </div>
                <div class="quality-badge">${movie.quality}</div>
            </div>
            <div class="movie-info">
                <h3 class="movie-title">${movie.title}</h3>
                <div class="movie-meta">
                    <span class="year">${movie.year}</span>
                    <span class="rating">
                        <i class="fas fa-star text-yellow-400"></i>
                        ${movie.rating}
                    </span>
                    <span class="views">${formatViews(movie.views)} views</span>
                </div>
                <div class="movie-genres">
                    ${movie.genre
                      .slice(0, 3)
                      .map((g) => `<span class="genre-tag">${g}</span>`)
                      .join("")}
                </div>
                <p class="movie-description">${movie.description.substring(0, 120)}...</p>
            </div>
        </div>
    `,
    )
    .join("")

  // Update pagination
  updatePagination(results.length)
}

function updatePagination(totalResults) {
  const paginationContainer = document.getElementById("pagination")
  if (!paginationContainer) return

  const totalPages = Math.ceil(totalResults / itemsPerPage)

  if (totalPages <= 1) {
    paginationContainer.innerHTML = ""
    return
  }

  let paginationHTML = ""

  // Previous button
  if (currentPage > 1) {
    paginationHTML += `<button onclick="changePage(${currentPage - 1})" class="pagination-btn">Previous</button>`
  }

  // Page numbers
  for (let i = Math.max(1, currentPage - 2); i <= Math.min(totalPages, currentPage + 2); i++) {
    paginationHTML += `
      <button onclick="changePage(${i})" class="pagination-btn ${i === currentPage ? "active" : ""}">${i}</button>
    `
  }

  // Next button
  if (currentPage < totalPages) {
    paginationHTML += `<button onclick="changePage(${currentPage + 1})" class="pagination-btn">Next</button>`
  }

  paginationContainer.innerHTML = paginationHTML
}

function changePage(page) {
  currentPage = page
  performSearch()
  window.scrollTo({ top: 0, behavior: "smooth" })
}

// Filter update functions
function updateGenreFilter(genre, checked) {
  if (checked) {
    currentFilters.genres.push(genre)
  } else {
    currentFilters.genres = currentFilters.genres.filter((g) => g !== genre)
  }
  performSearch()
}

function updateYearFilter() {
  const minYear = document.getElementById("year-min")?.value || 1990
  const maxYear = document.getElementById("year-max")?.value || 2025

  currentFilters.yearRange = [Number.parseInt(minYear), Number.parseInt(maxYear)]

  // Update display values
  const minValue = document.getElementById("year-min-value")
  const maxValue = document.getElementById("year-max-value")
  if (minValue) minValue.textContent = minYear
  if (maxValue) maxValue.textContent = maxYear

  performSearch()
}

function updateRatingFilter() {
  const minRating = document.getElementById("rating-min")?.value || 0
  const maxRating = document.getElementById("rating-max")?.value || 10

  currentFilters.ratingRange = [Number.parseFloat(minRating), Number.parseFloat(maxRating)]

  // Update display values
  const minValue = document.getElementById("rating-min-value")
  const maxValue = document.getElementById("rating-max-value")
  if (minValue) minValue.textContent = minRating
  if (maxValue) maxValue.textContent = maxRating

  performSearch()
}

function updateQualityFilter(quality, checked) {
  if (checked) {
    currentFilters.quality.push(quality)
  } else {
    currentFilters.quality = currentFilters.quality.filter((q) => q !== quality)
  }
  performSearch()
}

function clearFilters() {
  currentFilters = {
    genres: [],
    yearRange: [1990, 2025],
    ratingRange: [0, 10],
    quality: [],
  }

  // Reset form elements
  document.querySelectorAll('input[type="checkbox"]').forEach((cb) => (cb.checked = false))

  const yearMin = document.getElementById("year-min")
  const yearMax = document.getElementById("year-max")
  const ratingMin = document.getElementById("rating-min")
  const ratingMax = document.getElementById("rating-max")

  if (yearMin) yearMin.value = 1990
  if (yearMax) yearMax.value = 2025
  if (ratingMin) ratingMin.value = 0
  if (ratingMax) ratingMax.value = 10

  updateYearFilter()
  updateRatingFilter()
  performSearch()
}

function updateURL() {
  const url = new URL(window.location)
  if (currentSearchQuery) {
    url.searchParams.set("q", currentSearchQuery)
  } else {
    url.searchParams.delete("q")
  }
  window.history.replaceState({}, "", url)
}

// Utility functions
function goToMovie(slug) {
  window.location.href = `movie.html?slug=${slug}`
}

function formatViews(views) {
  if (views >= 1000000) {
    return (views / 1000000).toFixed(1) + "M"
  } else if (views >= 1000) {
    return (views / 1000).toFixed(1) + "K"
  }
  return views.toString()
}

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

function toggleFilters() {
  const filtersPanel = document.getElementById("filters-panel")
  if (filtersPanel) {
    filtersPanel.classList.toggle("hidden")
  }
}
