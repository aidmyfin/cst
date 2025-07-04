// Search page JavaScript

let searchFilters = {
  genres: [],
  yearRange: null,
  quality: [],
}

let searchTimeout = null

function debounce(func, wait) {
  return function (...args) {
    clearTimeout(searchTimeout)
    searchTimeout = setTimeout(() => func.apply(this, args), wait)
  }
}

function renderMovieGrid(container, movies) {
  container.innerHTML = movies
    .map(
      (movie) => `
        <div class="movie-item">
            <img src="${movie.poster}" alt="${movie.title}" class="w-full h-64 object-cover rounded">
            <div class="mt-2">
                <h3 class="text-white font-medium">${movie.title}</h3>
                <p class="text-gray-400 text-sm">${movie.year} • ${movie.genre.join(", ")}</p>
            </div>
        </div>
    `,
    )
    .join("")
}

document.addEventListener("DOMContentLoaded", () => {
  initializeSearchPage()
})

function initializeSearchPage() {
  const searchInput = document.getElementById("search-input")
  const searchButton = document.getElementById("search-button")

  // Initialize genre filters
  initializeGenreFilters()

  // Search input event listeners
  searchInput.addEventListener("input", debounce(handleSearchInput, 300))
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      performSearch()
    }
  })

  // Search button
  searchButton.addEventListener("click", performSearch)

  // Year filters
  const yearFrom = document.getElementById("year-from")
  const yearTo = document.getElementById("year-to")

  if (yearFrom && yearTo) {
    yearFrom.addEventListener("change", updateYearFilter)
    yearTo.addEventListener("change", updateYearFilter)
  }

  // Quality filters
  initializeQualityFilters()

  // Check for URL parameters
  const urlParams = new URLSearchParams(window.location.search)
  const query = urlParams.get("q")
  if (query) {
    searchInput.value = query
    performSearch()
  }
}

function initializeGenreFilters() {
  const genreContainer = document.getElementById("genre-filters")
  if (!genreContainer) return

  const genres = [
    "Action",
    "Adventure",
    "Animation",
    "Comedy",
    "Crime",
    "Drama",
    "Horror",
    "Romance",
    "Sci-Fi",
    "Thriller",
  ]

  genreContainer.innerHTML = genres
    .map(
      (genre) => `
        <button class="genre-filter bg-gray-700 hover:bg-red-600 text-white px-3 py-1 rounded text-sm" data-genre="${genre}">
            ${genre}
        </button>
    `,
    )
    .join("")

  // Add event listeners
  genreContainer.querySelectorAll(".genre-filter").forEach((button) => {
    button.addEventListener("click", function () {
      toggleGenreFilter(this.getAttribute("data-genre"))
      this.classList.toggle("active")
    })
  })
}

function initializeQualityFilters() {
  const qualityButtons = document.querySelectorAll(".quality-filter")
  qualityButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const quality = this.getAttribute("data-quality")
      toggleQualityFilter(quality)
      this.classList.toggle("active")
    })
  })
}

function handleSearchInput(event) {
  const query = event.target.value.trim()

  if (query.length > 0) {
    showSearchSuggestions(query)
  } else {
    hideSearchSuggestions()
  }
}

function showSearchSuggestions(query) {
  const suggestionsContainer = document.getElementById("search-suggestions")
  if (!suggestionsContainer) return

  const movies = window.movieData.searchMovies(query).slice(0, 5)

  if (movies.length > 0) {
    const suggestionsHTML = movies
      .map(
        (movie) => `
            <div class="suggestion-item" onclick="selectSuggestion('${movie.title}')">
                <div class="flex items-center space-x-3">
                    <img src="${movie.poster}" alt="${movie.title}" class="w-10 h-15 object-cover rounded">
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
  } else {
    hideSearchSuggestions()
  }
}

function hideSearchSuggestions() {
  const suggestionsContainer = document.getElementById("search-suggestions")
  if (suggestionsContainer) {
    suggestionsContainer.classList.add("hidden")
  }
}

function selectSuggestion(title) {
  const searchInput = document.getElementById("search-input")
  searchInput.value = title
  hideSearchSuggestions()
  performSearch()
}

function performSearch() {
  const query = document.getElementById("search-input").value.trim()

  // Hide suggestions
  hideSearchSuggestions()

  // Show loading
  showSearchLoading()

  // Update URL
  const url = new URL(window.location)
  if (query) {
    url.searchParams.set("q", query)
  } else {
    url.searchParams.delete("q")
  }
  window.history.pushState({}, "", url)

  // Perform search with delay to show loading
  setTimeout(() => {
    const results = window.movieData.searchMovies(query, searchFilters)
    displaySearchResults(results, query)
  }, 500)
}

function showSearchLoading() {
  // Hide other states
  document.getElementById("search-placeholder").classList.add("hidden")
  document.getElementById("search-results-container").classList.add("hidden")
  document.getElementById("no-results").classList.add("hidden")

  // Show loading
  document.getElementById("search-loading").classList.remove("hidden")
}

function displaySearchResults(results, query) {
  // Hide loading
  document.getElementById("search-loading").classList.add("hidden")

  if (results.length > 0) {
    // Show results
    document.getElementById("search-placeholder").classList.add("hidden")
    document.getElementById("no-results").classList.add("hidden")
    document.getElementById("search-results-container").classList.remove("hidden")

    // Update results header
    const resultsHeader = document.getElementById("search-results-header")
    resultsHeader.innerHTML = `
            <div class="flex items-center justify-between">
                <div>
                    <h2 class="text-2xl font-bold text-white">Search Results</h2>
                    <p class="text-gray-400">Found ${results.length} movie${results.length !== 1 ? "s" : ""} ${query ? `for "${query}"` : ""}</p>
                </div>
                <button onclick="clearSearch()" class="text-red-400 hover:text-red-300">Clear Search</button>
            </div>
        `

    // Render results
    const resultsGrid = document.getElementById("search-results-grid")
    renderMovieGrid(resultsGrid, results)
  } else {
    // Show no results
    document.getElementById("search-placeholder").classList.add("hidden")
    document.getElementById("search-results-container").classList.add("hidden")
    document.getElementById("no-results").classList.remove("hidden")
  }

  // Update active filters display
  updateActiveFiltersDisplay()
}

function toggleFilters() {
  const filtersContainer = document.getElementById("advanced-filters")
  filtersContainer.classList.toggle("hidden")
}

function toggleGenreFilter(genre) {
  const index = searchFilters.genres.indexOf(genre)
  if (index > -1) {
    searchFilters.genres.splice(index, 1)
  } else {
    searchFilters.genres.push(genre)
  }
  updateActiveFiltersDisplay()
}

function toggleQualityFilter(quality) {
  const index = searchFilters.quality.indexOf(quality)
  if (index > -1) {
    searchFilters.quality.splice(index, 1)
  } else {
    searchFilters.quality.push(quality)
  }
  updateActiveFiltersDisplay()
}

function updateYearFilter() {
  const yearFrom = document.getElementById("year-from").value
  const yearTo = document.getElementById("year-to").value

  if (yearFrom || yearTo) {
    searchFilters.yearRange = [
      yearFrom ? Number.parseInt(yearFrom) : 1990,
      yearTo ? Number.parseInt(yearTo) : new Date().getFullYear(),
    ]
  } else {
    searchFilters.yearRange = null
  }

  updateActiveFiltersDisplay()
}

function updateActiveFiltersDisplay() {
  const activeFiltersContainer = document.getElementById("active-filters")
  if (!activeFiltersContainer) return

  const activeFilters = []

  // Genre filters
  searchFilters.genres.forEach((genre) => {
    activeFilters.push({
      type: "genre",
      value: genre,
      label: genre,
    })
  })

  // Year range filter
  if (searchFilters.yearRange) {
    const [from, to] = searchFilters.yearRange
    activeFilters.push({
      type: "year",
      value: "year",
      label: `${from}-${to}`,
    })
  }

  // Quality filters
  searchFilters.quality.forEach((quality) => {
    activeFilters.push({
      type: "quality",
      value: quality,
      label: quality,
    })
  })

  if (activeFilters.length > 0) {
    activeFiltersContainer.innerHTML = activeFilters
      .map(
        (filter) => `
            <div class="filter-tag">
                ${filter.label}
                <button onclick="removeFilter('${filter.type}', '${filter.value}')">&times;</button>
            </div>
        `,
      )
      .join("")
    activeFiltersContainer.classList.remove("hidden")
  } else {
    activeFiltersContainer.classList.add("hidden")
  }
}

function removeFilter(type, value) {
  switch (type) {
    case "genre":
      const genreIndex = searchFilters.genres.indexOf(value)
      if (genreIndex > -1) {
        searchFilters.genres.splice(genreIndex, 1)
        // Update button state
        const genreButton = document.querySelector(`[data-genre="${value}"]`)
        if (genreButton) genreButton.classList.remove("active")
      }
      break
    case "year":
      searchFilters.yearRange = null
      document.getElementById("year-from").value = ""
      document.getElementById("year-to").value = ""
      break
    case "quality":
      const qualityIndex = searchFilters.quality.indexOf(value)
      if (qualityIndex > -1) {
        searchFilters.quality.splice(qualityIndex, 1)
        // Update button state
        const qualityButton = document.querySelector(`[data-quality="${value}"]`)
        if (qualityButton) qualityButton.classList.remove("active")
      }
      break
  }

  updateActiveFiltersDisplay()

  // Re-perform search if there's a query
  const query = document.getElementById("search-input").value.trim()
  if (query) {
    performSearch()
  }
}

function clearFilters() {
  // Reset filters
  searchFilters = {
    genres: [],
    yearRange: null,
    quality: [],
  }

  // Reset UI
  document.querySelectorAll(".genre-filter").forEach((btn) => btn.classList.remove("active"))
  document.querySelectorAll(".quality-filter").forEach((btn) => btn.classList.remove("active"))
  document.getElementById("year-from").value = ""
  document.getElementById("year-to").value = ""

  updateActiveFiltersDisplay()

  // Re-perform search if there's a query
  const query = document.getElementById("search-input").value.trim()
  if (query) {
    performSearch()
  }
}

function clearSearch() {
  // Clear input
  document.getElementById("search-input").value = ""

  // Clear URL
  const url = new URL(window.location)
  url.searchParams.delete("q")
  window.history.pushState({}, "", url)

  // Clear filters
  clearFilters()

  // Show placeholder
  document.getElementById("search-loading").classList.add("hidden")
  document.getElementById("search-results-container").classList.add("hidden")
  document.getElementById("no-results").classList.add("hidden")
  document.getElementById("search-placeholder").classList.remove("hidden")
}
