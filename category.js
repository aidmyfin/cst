// Category page JavaScript

let currentCategory = null
let currentSort = "title"
let currentYearFilter = ""

function getUrlParameter(name) {
  name = name.replace(/[[]/, "\\[").replace(/[\]]/, "\\]")
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)")
  var results = regex.exec(location.search)
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "))
}

function renderMovieGrid(container, movies) {
  container.innerHTML = ""
  movies.forEach((movie) => {
    const movieElement = document.createElement("div")
    movieElement.classList.add("movie")
    movieElement.innerHTML = `
            <h3>${movie.title}</h3>
            <p>Year: ${movie.year}</p>
            <p>Rating: ${movie.rating}</p>
        `
    container.appendChild(movieElement)
  })
}

document.addEventListener("DOMContentLoaded", () => {
  initializeCategoryPage()
})

function initializeCategoryPage() {
  const genre = getUrlParameter("genre")

  if (!genre) {
    window.location.href = "categories.html"
    return
  }

  currentCategory = genre

  // Update page title and content
  updatePageTitle()
  loadCategoryMovies()

  // Initialize filters
  initializeFilters()
}

function updatePageTitle() {
  const categoryTitle = document.getElementById("category-title")
  const categoryDescription = document.getElementById("category-description")
  const pageTitle = document.getElementById("page-title")

  const formattedCategory = currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1)

  if (categoryTitle) {
    categoryTitle.textContent = `${formattedCategory} Movies`
  }

  if (pageTitle) {
    pageTitle.textContent = formattedCategory
  }

  // Update page title
  document.title = `${formattedCategory} Movies - CINESTREAM`

  // Load movies and update description
  const movies = window.movieData.getMoviesByGenre(formattedCategory)
  if (categoryDescription) {
    categoryDescription.textContent = `Discover ${movies.length} amazing ${formattedCategory.toLowerCase()} movies`
  }
}

function loadCategoryMovies() {
  const container = document.getElementById("category-movies")
  const noMoviesContainer = document.getElementById("no-movies")

  if (!container) return

  const formattedCategory = currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1)
  let movies = window.movieData.getMoviesByGenre(formattedCategory)

  // Apply filters
  movies = applyFilters(movies)

  if (movies.length > 0) {
    renderMovieGrid(container, movies)
    container.classList.remove("hidden")
    if (noMoviesContainer) noMoviesContainer.classList.add("hidden")
  } else {
    container.classList.add("hidden")
    if (noMoviesContainer) noMoviesContainer.classList.remove("hidden")
  }
}

function initializeFilters() {
  const sortSelect = document.getElementById("sort-select")
  const yearFilter = document.getElementById("year-filter")

  if (sortSelect) {
    sortSelect.addEventListener("change", function () {
      currentSort = this.value
      loadCategoryMovies()
    })
  }

  if (yearFilter) {
    yearFilter.addEventListener("change", function () {
      currentYearFilter = this.value
      loadCategoryMovies()
    })
  }
}

function applyFilters(movies) {
  let filteredMovies = [...movies]

  // Apply year filter
  if (currentYearFilter) {
    filteredMovies = filteredMovies.filter((movie) => movie.year.toString() === currentYearFilter)
  }

  // Apply sorting
  switch (currentSort) {
    case "title":
      filteredMovies.sort((a, b) => a.title.localeCompare(b.title))
      break
    case "year":
      filteredMovies.sort((a, b) => b.year - a.year)
      break
    case "rating":
      filteredMovies.sort((a, b) => b.rating - a.rating)
      break
  }

  return filteredMovies
}
