// Search page JavaScript

let searchTimeout = null
let activeFilters = {
  genres: [],
  yearRange: null,
  quality: [],
}

document.addEventListener("DOMContentLoaded", () => {
  initializeSearchPage()
})

function initializeSearchPage() {
  const searchInput = document.getElementById("search-input")
  const searchButton = document.getElementById("search-button")

  // Initialize search input
  if (searchInput) {
    searchInput.addEventListener("input", debounceSearch)
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        performSearch()
      }
    })
  }

  // Initialize search button
  if (searchButton) {
    searchButton.addEventListener("click", performSearch)
  }

  // Initialize filters
  initializeFilters()

  // Check for URL parameters
  const urlParams = new URLSearchParams(window.location.search)
  const query = urlParams.get("q")
  if (query) {
    searchInput.value = query
    performSearch()
  }
}

function debounceSearch() {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    showSearchSuggestions()
  }, 300)
}

function showSearchSuggestions() {
  const searchInput = document.getElementById("search-input")
  const suggestionsContainer = document.getElementById("search-suggestions")
  const query = searchInput.value.trim()

  if (!query || query.length < 2) {
    suggestionsContainer.classList.add("hidden")
    return
  }

  const suggestions = window.movieData.searchMovies(query).slice(0, 5)

  if (suggestions.length === 0) {
    suggestionsContainer.classList.add("hidden")
    return
  }

  const suggestionsHTML = suggestions
    .map(
      (movie) => `
        <div class="suggestion-item" onclick="selectSuggestion('${movie.slug}')">
          <div class="flex items-center space-x-3">
            <img src="${movie.poster}" alt="${movie.title}" class="w-12 h-16 object-cover rounded">
            <div>
              <div class="text-white font-medium">${movie.title}</div>
              <div class="text-gray-400 text-sm">${movie.year} • ${movie.genre.join(", ")}</div>
            </div>
          </div>
        </div>
      `,
    )
    .join("")

  suggestionsContainer.innerHTML = suggestionsHTML
  suggestionsContainer.classList.remove("hidden")
}

function selectSuggestion(slug) {
  window.location.href = `movie.html?slug=${slug}`
}

function performSearch() {
  const searchInput = document.getElementById("search-input")
  const query = searchInput.value.trim()

  // Hide suggestions
  document.getElementById("search-suggestions").classList.add("hidden")

  if (!query) {
    showSearchPlaceholder()
    return
  }

  // Show loading
  showSearchLoading()

  // Simulate search delay
  setTimeout(() => {
    const results = window.movieData.searchMovies(query, activeFilters)
    displaySearchResults(results, query)
  }, 500)
}

function showSearchPlaceholder() {
  document.getElementById("search-placeholder").classList.remove("hidden")
  document.getElementById("search-loading").classList.add("hidden")
  document.getElementById("search-results-container").classList.add("hidden")
  document.getElementById("no-results").classList.add("hidden")
}

function showSearchLoading() {
  document.getElementById("search-placeholder").classList.add("hidden")
  document.getElementById("search-loading").classList.remove("hidden")
  document.getElementById("search-results-container").classList.add("hidden")
  document.getElementById("no-results").classList.add("hidden")
}

function displaySearchResults(results, query) {
  document.getElementById("search-placeholder").classList.add("hidden")
  document.getElementById("search-loading").classList.add("hidden")

  if (results.length === 0) {
    document.getElementById("no-results").classList.remove("hidden")
    document.getElementById("search-results-container").classList.add("hidden")
    return
  }

  // Show results
  document.getElementById("no-results").classList.add("hidden")
  document.getElementById("search-results-container").classList.remove("hidden")

  // Update results header
  const resultsHeader = document.getElementById("search-results-header")
  resultsHeader.innerHTML = `
    <h2 class="text-2xl font-bold text-white mb-2">Search Results</h2>
    <p class="text-gray-400">Found ${results.length} results for "${query}"</p>
  `

  // Render results grid
  const resultsGrid = document.getElementById("search-results-grid")
  renderMovieGrid(resultsGrid, results)
}

function initializeFilters() {
  // Initialize genre filters
  const genreFilters = document.getElementById("genre-filters")
  const genres = ["Action", "Comedy", "Drama", "Horror", "Thriller", "Sci-Fi", "Animation", "Romance", "Crime"]

  if (genreFilters) {
    genreFilters.innerHTML = genres
      .map(
        (genre) => `
          <button class="genre-filter bg-gray-700 hover:bg-red-600 text-white px-3 py-1 rounded text-sm" data-genre="${genre}">
            ${genre}
          </button>
        `,
      )
      .join("")

    // Add event listeners
    genreFilters.addEventListener("click", (e) => {
      if (e.target.classList.contains("genre-filter")) {
        toggleGenreFilter(e.target)
      }
    })
  }

  // Initialize quality filters
  const qualityFilters = document.querySelectorAll(".quality-filter")
  qualityFilters.forEach((filter) => {
    filter.addEventListener("click", () => {
      toggleQualityFilter(filter)
    })
  })
}

function toggleGenreFilter(button) {
  const genre = button.getAttribute("data-genre")

  if (button.classList.contains("active")) {
    button.classList.remove("active")
    activeFilters.genres = activeFilters.genres.filter((g) => g !== genre)
  } else {
    button.classList.add("active")
    activeFilters.genres.push(genre)
  }

  updateActiveFilters()
}

function toggleQualityFilter(button) {
  const quality = button.getAttribute("data-quality")

  if (button.classList.contains("active")) {
    button.classList.remove("active")
    activeFilters.quality = activeFilters.quality.filter((q) => q !== quality)
  } else {
    button.classList.add("active")
    activeFilters.quality.push(quality)
  }

  updateActiveFilters()
}

function updateActiveFilters() {
  const activeFiltersContainer = document.getElementById("active-filters")
  const filters = []

  // Add genre filters
  activeFilters.genres.forEach((genre) => {
    filters.push({
      type: "genre",
      value: genre,
      label: genre,
    })
  })

  // Add quality filters
  activeFilters.quality.forEach((quality) => {
    filters.push({
      type: "quality",
      value: quality,
      label: quality,
    })
  })

  if (filters.length === 0) {
    activeFiltersContainer.classList.add("hidden")
    return
  }

  activeFiltersContainer.classList.remove("hidden")
  activeFiltersContainer.innerHTML = filters
    .map(
      (filter) => `
        <div class="filter-tag">
          ${filter.label}
          <button onclick="removeFilter('${filter.type}', '${filter.value}')" class="ml-2">
            <i class="fas fa-times"></i>
          </button>
        </div>
      `,
    )
    .join("")
}

function removeFilter(type, value) {
  if (type === "genre") {
    activeFilters.genres = activeFilters.genres.filter((g) => g !== value)
    document.querySelector(`[data-genre="${value}"]`).classList.remove("active")
  } else if (type === "quality") {
    activeFilters.quality = activeFilters.quality.filter((q) => q !== value)
    document.querySelector(`[data-quality="${value}"]`).classList.remove("active")
  }

  updateActiveFilters()
  performSearch()
}

function clearAllFilters() {
  activeFilters = {
    genres: [],
    yearRange: null,
    quality: [],
  }

  // Clear UI
  document.querySelectorAll(".genre-filter").forEach((btn) => btn.classList.remove("active"))
  document.querySelectorAll(".quality-filter").forEach((btn) => btn.classList.remove("active"))
  document.getElementById("active-filters").classList.add("hidden")

  performSearch()
}

// Utility function to render movie grid
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

function goToMovie(slug) {
  window.location.href = `movie.html?slug=${slug}`
}
