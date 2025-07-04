// Downloads page JavaScript

document.addEventListener("DOMContentLoaded", () => {
  initializeDownloadsPage()
})

function initializeDownloadsPage() {
  loadPopularDownloads()
  loadRecentDownloads()
}

function loadPopularDownloads() {
  const container = document.getElementById("popular-downloads")
  if (!container) return

  // Get movies with highest ratings as popular downloads
  const popularMovies = window.movieData
    .getAllMovies()
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 8)

  window.renderMovieGrid(container, popularMovies)
}

function loadRecentDownloads() {
  const container = document.getElementById("recent-downloads")
  if (!container) return

  // Get newest movies as recent downloads
  const recentMovies = window.movieData.getNewMovies().slice(0, 8)

  window.renderMovieGrid(container, recentMovies)
}
