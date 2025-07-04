// Movie page JavaScript with enhanced video player functionality

let currentMovie = null
let currentEpisode = null
let isFullPagePlayer = false
let videoPopupWindow = null

// Utility functions
function getUrlParameter(name) {
  name = name.replace(/[[]/, "\\[").replace(/[\]]/, "\\]")
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)")
  var results = regex.exec(location.search)
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "))
}

function showError(message) {
  document.getElementById("loading-state").classList.add("hidden")
  document.getElementById("error-state").classList.remove("hidden")
  document.getElementById("movie-content").classList.add("hidden")
}

function showToast(message, type = "info") {
  const toast = document.createElement("div")
  toast.className = `fixed top-20 right-4 z-50 px-6 py-3 rounded-lg text-white font-medium transition-all duration-300 transform translate-x-full`

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
      if (document.body.contains(toast)) {
        document.body.removeChild(toast)
      }
    }, 300)
  }, 3000)
}

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

function toggleMobileMenu() {
  const menu = document.getElementById("mobile-menu")
  const icon = document.getElementById("mobile-menu-icon")

  if (menu.classList.contains("hidden")) {
    menu.classList.remove("hidden")
    icon.classList.remove("fa-bars")
    icon.classList.add("fa-times")
  } else {
    menu.classList.add("hidden")
    icon.classList.remove("fa-times")
    icon.classList.add("fa-bars")
  }
}

// Initialize page
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded, initializing movie page...")
  initializeMoviePage()
  initializeTabs()
  initializeVideoPlayer()
})

function initializeMoviePage() {
  const slug = getUrlParameter("slug")
  const episodeParam = getUrlParameter("episode")

  console.log("Initializing movie page with slug:", slug)

  if (!slug) {
    console.error("No slug parameter found")
    showError("Movie not found")
    return
  }

  // Check if movieData is available
  if (!window.movieData) {
    console.error("Movie data not loaded")
    showError("Movie data not available")
    return
  }

  currentMovie = window.movieData.getMovieBySlug(slug)
  console.log("Found movie:", currentMovie)

  if (!currentMovie) {
    console.error("Movie not found for slug:", slug)
    showError("Movie not found")
    return
  }

  // Hide loading, show content
  document.getElementById("loading-state").classList.add("hidden")
  document.getElementById("movie-content").classList.remove("hidden")

  // Update page title
  document.title = `${currentMovie.title} - CINESTREAM`

  // Load movie content
  loadMoviePlayer(episodeParam)
  loadMovieInfo()
  loadEpisodes()
  loadOverviewTab()
  loadDownloadsTab()
  loadCastTab()
  loadRelatedMovies()

  console.log("Movie page initialized successfully")
}

function loadMoviePlayer(episodeParam) {
  console.log("Loading movie player...")

  const mobilePlayer = document.getElementById("mobile-player")
  const desktopPlayer = document.getElementById("desktop-player")

  let embedCode = currentMovie.embedCode
  let videoUrl = currentMovie.videoUrl
  let title = currentMovie.title
  let hasEmbed = false

  // Handle episodes for TV series
  if (currentMovie.multipleDownloads && episodeParam) {
    const episodeIndex = Number.parseInt(episodeParam) - 1
    if (episodeIndex >= 0 && episodeIndex < currentMovie.multipleDownloads.length) {
      const episode = currentMovie.multipleDownloads[episodeIndex]
      embedCode = episode.embedCode
      videoUrl = episode.videoUrl || episode.url
      title = `${currentMovie.title} - ${episode.label}`
      currentEpisode = episodeIndex
      hasEmbed = !!episode.embedCode
    }
  } else if (currentMovie.embedCode) {
    hasEmbed = true
  }

  // Create enhanced player HTML with better video handling
  let playerHTML = ""

  if (hasEmbed && embedCode) {
    playerHTML = `
      <div class="player-container relative bg-black rounded-lg overflow-hidden">
        <div class="aspect-video">
          <div class="player-placeholder bg-gradient-to-br from-gray-800 to-gray-900 flex flex-col items-center justify-center h-full cursor-pointer hover:from-gray-700 hover:to-gray-800 transition-all duration-300 group" onclick="openVideoPlayer()">
            <div class="play-icon bg-red-600 rounded-full w-20 h-20 flex items-center justify-center mb-6 hover:bg-red-700 transition-all duration-300 shadow-2xl group-hover:scale-110 transform">
              <i class="fas fa-play text-3xl text-white ml-1"></i>
            </div>
            <h3 class="text-2xl font-bold mb-3 text-center px-6 text-white group-hover:text-gray-100 transition-colors">${title}</h3>
            <p class="text-gray-400 text-center px-6 mb-6 group-hover:text-gray-300 transition-colors">Click to watch in full screen</p>
            <div class="player-preview bg-red-600/20 px-6 py-3 rounded-lg border border-red-600/30 group-hover:bg-red-600/30 group-hover:border-red-600/50 transition-all duration-300">
              <i class="fas fa-expand text-sm mr-3 text-red-400"></i>
              <span class="text-red-400 font-medium">Full Screen Player Available</span>
            </div>
            <div class="mt-4 flex space-x-4">
              <div class="flex items-center text-gray-400 text-sm">
                <i class="fas fa-video mr-2"></i>
                <span>${currentMovie.quality}</span>
              </div>
              <div class="flex items-center text-gray-400 text-sm">
                <i class="fas fa-clock mr-2"></i>
                <span>${currentMovie.duration}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  } else {
    playerHTML = `
      <div class="player-container relative bg-black rounded-lg overflow-hidden">
        <div class="aspect-video">
          <div class="player-placeholder bg-gray-800 flex flex-col items-center justify-center h-full">
            <div class="play-icon bg-gray-600 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <i class="fas fa-exclamation-triangle text-2xl text-white"></i>
            </div>
            <h3 class="text-xl font-bold mb-2 text-center px-4 text-white">${title}</h3>
            <p class="text-gray-400 text-center px-4">Video not available</p>
          </div>
        </div>
      </div>
    `
  }

  if (mobilePlayer) mobilePlayer.innerHTML = playerHTML
  if (desktopPlayer) desktopPlayer.innerHTML = playerHTML

  // Store embed code and video URL for later use
  window.currentEmbedCode = embedCode
  window.currentVideoUrl = videoUrl
  window.currentVideoTitle = title

  console.log("Player loaded with embed:", !!embedCode)
  console.log("Current embed code:", embedCode)
}

function loadMovieInfo() {
  console.log("Loading movie info...")

  const mobileInfo = document.getElementById("mobile-movie-info")
  const desktopInfo = document.getElementById("desktop-movie-info")

  const infoHTML = `
        <div class="flex items-start space-x-4 mb-4">
            <img src="${currentMovie.poster}" alt="${currentMovie.title}" class="w-20 h-30 object-cover rounded flex-shrink-0" onerror="this.src='/placeholder.svg?height=120&width=80'">
            <div class="flex-1 min-w-0">
                <h1 class="text-xl font-bold text-white mb-2 break-words">${currentMovie.title}</h1>
                <div class="flex flex-wrap gap-2 mb-2">
                    ${currentMovie.genre.map((g) => `<span class="bg-red-600 text-white px-2 py-1 rounded text-xs">${g}</span>`).join("")}
                </div>
                <div class="text-sm text-gray-400 space-y-1">
                    <div><i class="fas fa-calendar mr-2"></i>${currentMovie.year}</div>
                    <div><i class="fas fa-clock mr-2"></i>${currentMovie.duration}</div>
                    <div><i class="fas fa-star mr-2 text-yellow-400"></i>${currentMovie.rating}/10</div>
                    <div><i class="fas fa-video mr-2"></i>${currentMovie.quality}</div>
                    <div><i class="fas fa-eye mr-2"></i>${currentMovie.views.toLocaleString()} views</div>
                </div>
            </div>
        </div>
        <p class="text-gray-300 text-sm mb-4 line-clamp-3">${currentMovie.description}</p>
        <div class="flex flex-wrap gap-2">
            <button onclick="openVideoPlayer()" class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded flex items-center space-x-2 transition-colors">
                <i class="fas fa-play"></i>
                <span>Watch Now</span>
            </button>
            <button onclick="downloadMovie()" class="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded flex items-center space-x-2 transition-colors">
                <i class="fas fa-download"></i>
                <span>Download</span>
            </button>
        </div>
    `

  if (mobileInfo) mobileInfo.innerHTML = infoHTML
  if (desktopInfo) desktopInfo.innerHTML = infoHTML

  console.log("Movie info loaded")
}

function loadEpisodes() {
  console.log("Loading episodes...")

  if (!currentMovie.multipleDownloads || !currentMovie.multipleDownloads.length) {
    console.log("No episodes found")
    return
  }

  const mobileEpisodes = document.getElementById("mobile-episodes")
  const desktopEpisodes = document.getElementById("desktop-episodes")
  const mobileEpisodesList = document.getElementById("mobile-episodes-list")
  const desktopEpisodesList = document.getElementById("desktop-episodes-list")

  const episodesHTML = currentMovie.multipleDownloads
    .map(
      (episode, index) => `
        <div class="episode-item bg-gray-800 hover:bg-gray-700 p-3 rounded cursor-pointer transition-colors ${currentEpisode === index ? "bg-red-600 hover:bg-red-700" : ""}" onclick="playEpisode(${index})">
            <div class="flex items-center justify-between">
                <div class="flex-1 min-w-0">
                    <h4 class="text-white font-medium truncate">${episode.label}</h4>
                    <p class="text-gray-400 text-sm">Click to watch</p>
                </div>
                <div class="text-red-400 ml-2">
                    <i class="fas fa-play"></i>
                </div>
            </div>
        </div>
    `,
    )
    .join("")

  if (mobileEpisodesList) mobileEpisodesList.innerHTML = episodesHTML
  if (desktopEpisodesList) desktopEpisodesList.innerHTML = episodesHTML

  if (mobileEpisodes) mobileEpisodes.classList.remove("hidden")
  if (desktopEpisodes) desktopEpisodes.classList.remove("hidden")

  console.log(`Loaded ${currentMovie.multipleDownloads.length} episodes`)
}

function playEpisode(episodeIndex) {
  console.log("Playing episode:", episodeIndex)

  currentEpisode = episodeIndex
  const episode = currentMovie.multipleDownloads[episodeIndex]

  // Update URL
  const url = new URL(window.location)
  url.searchParams.set("episode", episodeIndex + 1)
  window.history.pushState({}, "", url)

  // Store current embed code
  window.currentEmbedCode = episode.embedCode
  window.currentVideoTitle = `${currentMovie.title} - ${episode.label}`

  // Update player
  loadMoviePlayer(episodeIndex + 1)

  // Update episode highlighting
  document.querySelectorAll(".episode-item").forEach((item, index) => {
    if (index === episodeIndex) {
      item.classList.add("bg-red-600", "hover:bg-red-700")
      item.classList.remove("bg-gray-800", "hover:bg-gray-700")
    } else {
      item.classList.remove("bg-red-600", "hover:bg-red-700")
      item.classList.add("bg-gray-800", "hover:bg-gray-700")
    }
  })

  showToast(`Now playing: ${episode.label}`, "success")
}

function initializeTabs() {
  console.log("Initializing tabs...")

  // Mobile tabs
  const mobileTabButtons = document.querySelectorAll(".tab-button")
  mobileTabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const tabName = button.getAttribute("data-tab")
      switchMobileTab(tabName)
    })
  })

  // Desktop tabs
  const desktopTabButtons = document.querySelectorAll(".desktop-tab-button")
  desktopTabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const tabName = button.getAttribute("data-tab")
      switchDesktopTab(tabName)
    })
  })
}

function switchMobileTab(tabName) {
  // Update button states
  document.querySelectorAll(".tab-button").forEach((btn) => {
    btn.classList.remove("bg-red-600", "text-white")
    btn.classList.add("text-gray-400")
  })
  document.querySelector(`[data-tab="${tabName}"].tab-button`).classList.add("bg-red-600", "text-white")
  document.querySelector(`[data-tab="${tabName}"].tab-button`).classList.remove("text-gray-400")

  // Update content
  document.querySelectorAll(".tab-content").forEach((content) => {
    content.classList.add("hidden")
  })
  document.getElementById(`${tabName}-tab`).classList.remove("hidden")
}

function switchDesktopTab(tabName) {
  // Update button states
  document.querySelectorAll(".desktop-tab-button").forEach((btn) => {
    btn.classList.remove("bg-red-600", "text-white")
    btn.classList.add("text-gray-400")
  })
  document.querySelector(`[data-tab="${tabName}"].desktop-tab-button`).classList.add("bg-red-600", "text-white")
  document.querySelector(`[data-tab="${tabName}"].desktop-tab-button`).classList.remove("text-gray-400")

  // Update content
  document.querySelectorAll(".desktop-tab-content").forEach((content) => {
    content.classList.add("hidden")
  })
  document.getElementById(`desktop-${tabName}-tab`).classList.remove("hidden")
}

function loadOverviewTab() {
  console.log("Loading overview tab...")

  const mobileOverview = document.getElementById("mobile-overview")
  const desktopOverview = document.getElementById("desktop-overview")

  const overviewHTML = `
        <div class="space-y-4">
            <div>
                <h3 class="text-white font-semibold mb-2">Synopsis</h3>
                <p class="text-gray-300">${currentMovie.description}</p>
            </div>
            <div>
                <h3 class="text-white font-semibold mb-2">Details</h3>
                <div class="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <span class="text-gray-400">Director:</span>
                        <span class="text-white ml-2">${currentMovie.director || "N/A"}</span>
                    </div>
                    <div>
                        <span class="text-gray-400">Year:</span>
                        <span class="text-white ml-2">${currentMovie.year}</span>
                    </div>
                    <div>
                        <span class="text-gray-400">Duration:</span>
                        <span class="text-white ml-2">${currentMovie.duration}</span>
                    </div>
                    <div>
                        <span class="text-gray-400">Rating:</span>
                        <span class="text-white ml-2">${currentMovie.rating}/10</span>
                    </div>
                    <div>
                        <span class="text-gray-400">Country:</span>
                        <span class="text-white ml-2">${currentMovie.country}</span>
                    </div>
                    <div>
                        <span class="text-gray-400">Language:</span>
                        <span class="text-white ml-2">${currentMovie.language}</span>
                    </div>
                </div>
            </div>
            <div>
                <h3 class="text-white font-semibold mb-2">Genres</h3>
                <div class="flex flex-wrap gap-2">
                    ${currentMovie.genre.map((g) => `<span class="bg-gray-700 text-white px-3 py-1 rounded-full text-sm">${g}</span>`).join("")}
                </div>
            </div>
        </div>
    `

  if (mobileOverview) mobileOverview.innerHTML = overviewHTML
  if (desktopOverview) desktopOverview.innerHTML = overviewHTML
}

function loadDownloadsTab() {
  console.log("Loading downloads tab...")

  const mobileDownloads = document.getElementById("mobile-downloads")
  const desktopDownloads = document.getElementById("desktop-downloads")
  const desktopQuickDownload = document.getElementById("desktop-quick-download")

  let downloadsHTML = ""

  if (currentMovie.multipleDownloads && currentMovie.multipleDownloads.length > 0) {
    // TV Series with episodes
    downloadsHTML = `
            <div class="space-y-3">
                <h4 class="text-white font-semibold mb-3">Episode Downloads</h4>
                ${currentMovie.multipleDownloads
                  .map(
                    (episode, index) => `
                    <div class="bg-gray-800 p-4 rounded-lg">
                        <div class="flex items-center justify-between">
                            <div class="flex-1 min-w-0">
                                <h4 class="text-white font-medium truncate">${episode.label}</h4>
                                <p class="text-gray-400 text-sm">Click to download episode</p>
                            </div>
                            <div class="flex space-x-2 ml-4">
                                <button onclick="downloadEpisode(${index})" class="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors">
                                    <i class="fas fa-download mr-1"></i>
                                    Download
                                </button>
                            </div>
                        </div>
                    </div>
                `,
                  )
                  .join("")}
            </div>
        `
  } else {
    // Single movie
    downloadsHTML = `
            <div class="space-y-4">
                <div class="bg-gray-800 p-4 rounded-lg">
                    <h4 class="text-white font-medium mb-3">${currentMovie.title}</h4>
                    <div class="grid grid-cols-1 gap-3">
                        <button onclick="downloadMovie()" class="bg-red-600 hover:bg-red-700 text-white p-3 rounded text-center transition-colors">
                            <div class="font-bold">Download ${currentMovie.quality}</div>
                            <div class="text-sm opacity-75">Click to download</div>
                        </button>
                    </div>
                </div>
            </div>
        `
  }

  if (mobileDownloads) mobileDownloads.innerHTML = downloadsHTML
  if (desktopDownloads) desktopDownloads.innerHTML = downloadsHTML

  // Quick download for desktop sidebar
  if (desktopQuickDownload) {
    desktopQuickDownload.innerHTML = `
            <div class="space-y-2">
                <button onclick="downloadMovie()" class="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded text-sm transition-colors">
                    <i class="fas fa-download mr-2"></i>
                    Download ${currentMovie.quality}
                </button>
                ${
                  currentMovie.multipleDownloads
                    ? `
                    <p class="text-gray-400 text-xs text-center">
                        ${currentMovie.multipleDownloads.length} episodes available
                    </p>
                `
                    : ""
                }
            </div>
        `
  }
}

function loadCastTab() {
  console.log("Loading cast tab...")

  const desktopCast = document.getElementById("desktop-cast")

  if (!desktopCast) return

  const castHTML = `
        <div class="space-y-4">
            ${
              currentMovie.cast && currentMovie.cast.length > 0
                ? `
            <div>
                <h3 class="text-white font-semibold mb-3">Cast</h3>
                <div class="grid grid-cols-2 gap-3">
                    ${currentMovie.cast
                      .map(
                        (actor) => `
                        <div class="text-gray-300">${actor}</div>
                    `,
                      )
                      .join("")}
                </div>
            </div>
            `
                : ""
            }
            ${
              currentMovie.director
                ? `
            <div>
                <h3 class="text-white font-semibold mb-3">Director</h3>
                <div class="text-gray-300">${currentMovie.director}</div>
            </div>
            `
                : ""
            }
            <div>
                <h3 class="text-white font-semibold mb-3">Additional Info</h3>
                <div class="space-y-2 text-sm">
                    <div><span class="text-gray-400">Country:</span> <span class="text-white">${currentMovie.country}</span></div>
                    <div><span class="text-gray-400">Language:</span> <span class="text-white">${currentMovie.language}</span></div>
                    <div><span class="text-gray-400">Views:</span> <span class="text-white">${currentMovie.views.toLocaleString()}</span></div>
                </div>
            </div>
        </div>
    `

  desktopCast.innerHTML = castHTML
}

function loadRelatedMovies() {
  console.log("Loading related movies...")

  const container = document.getElementById("related-movies")
  if (!container) return

  const relatedMovies = window.movieData.getRelatedMovies(currentMovie.id, currentMovie.genre, 8)

  if (relatedMovies.length === 0) {
    container.innerHTML = '<p class="text-gray-400 text-center py-8">No related movies found</p>'
    return
  }

  container.innerHTML = relatedMovies
    .map(
      (movie) => `
        <div class="movie-card cursor-pointer" onclick="goToMovie('${movie.slug}')">
            <div class="relative">
                <img src="${movie.poster}" alt="${movie.title}" loading="lazy" class="w-full h-auto" onerror="this.src='/placeholder.svg?height=450&width=300'">
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

  console.log(`Loaded ${relatedMovies.length} related movies`)
}

function downloadMovie() {
  let downloadUrl = currentMovie.downloadUrl

  // Handle current episode download for series
  if (currentEpisode !== null && currentMovie.multipleDownloads) {
    const episode = currentMovie.multipleDownloads[currentEpisode]
    downloadUrl = episode.url || episode.downloadUrl
  }

  if (downloadUrl) {
    // Open download in new tab
    const link = document.createElement("a")
    link.href = downloadUrl
    link.target = "_blank"
    link.rel = "noopener noreferrer"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    showToast(`Starting download: ${currentMovie.title}`, "success")
  } else {
    showToast("Download not available", "error")
  }
}

function downloadEpisode(episodeIndex) {
  const episode = currentMovie.multipleDownloads[episodeIndex]
  if (episode.url) {
    window.open(episode.url, "_blank")
    showToast(`Starting download: ${episode.label}`, "success")
  } else {
    showToast("Download not available for this episode", "error")
  }
}

// Enhanced Video Player Functions
function initializeVideoPlayer() {
  console.log("Initializing enhanced video player...")

  // Close popup when main window is closed or refreshed
  window.addEventListener("beforeunload", () => {
    if (videoPopupWindow && !videoPopupWindow.closed) {
      videoPopupWindow.close()
    }
  })
}

function openVideoPlayer() {
  console.log("Opening enhanced video player...")

  if (!window.currentEmbedCode) {
    showToast("Video not available", "error")
    console.error("No embed code available")
    return
  }

  // Close existing popup if open
  if (videoPopupWindow && !videoPopupWindow.closed) {
    videoPopupWindow.close()
  }

  const title = window.currentVideoTitle || currentMovie.title

  // Create popup window with optimal settings for video playback
  const popupFeatures = [
    "width=1280",
    "height=720",
    "left=" + (screen.width / 2 - 640),
    "top=" + (screen.height / 2 - 360),
    "toolbar=no",
    "location=no",
    "directories=no",
    "status=no",
    "menubar=no",
    "scrollbars=yes",
    "resizable=yes",
    "copyhistory=no",
  ].join(",")

  try {
    videoPopupWindow = window.open("", "videoPlayer", popupFeatures)

    if (!videoPopupWindow) {
      // Fallback to full page player if popup is blocked
      console.warn("Popup blocked, falling back to full page player")
      openFullPagePlayer()
      return
    }

    // Create enhanced video player HTML
    const playerHTML = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title} - CINESTREAM Player</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            background: #000;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            overflow: hidden;
            height: 100vh;
            display: flex;
            flex-direction: column;
          }
          
          .player-header {
            background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
            padding: 12px 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #333;
            box-shadow: 0 2px 10px rgba(0,0,0,0.3);
          }
          
          .player-title {
            color: #fff;
            font-size: 16px;
            font-weight: 600;
            display: flex;
            align-items: center;
          }
          
          .player-title i {
            color: #ef4444;
            margin-right: 8px;
          }
          
          .player-controls {
            display: flex;
            gap: 8px;
          }
          
          .control-btn {
            background: #374151;
            border: none;
            color: #fff;
            padding: 8px 12px;
            border-radius: 6px;
            cursor: pointer;
            transition: all 0.2s;
            font-size: 14px;
          }
          
          .control-btn:hover {
            background: #4b5563;
            transform: translateY(-1px);
          }
          
          .close-btn {
            background: #ef4444;
          }
          
          .close-btn:hover {
            background: #dc2626;
          }
          
          .video-container {
            flex: 1;
            position: relative;
            background: #000;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          
          .video-wrapper {
            width: 100%;
            height: 100%;
            position: relative;
          }
          
          .video-wrapper iframe {
            width: 100% !important;
            height: 100% !important;
            border: none !important;
            background: #000;
          }
          
          .loading-spinner {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: #ef4444;
            font-size: 24px;
            z-index: 10;
          }
          
          .error-message {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: #fff;
            text-align: center;
            z-index: 10;
          }
          
          @keyframes spin {
            0% { transform: translate(-50%, -50%) rotate(0deg); }
            100% { transform: translate(-50%, -50%) rotate(360deg); }
          }
          
          .loading-spinner i {
            animation: spin 1s linear infinite;
          }
          
          .fullscreen-btn {
            background: #059669;
          }
          
          .fullscreen-btn:hover {
            background: #047857;
          }
        </style>
      </head>
      <body>
        <div class="player-header">
          <div class="player-title">
            <i class="fas fa-play-circle"></i>
            ${title}
          </div>
          <div class="player-controls">
            <button class="control-btn fullscreen-btn" onclick="toggleFullscreen()" title="Toggle Fullscreen">
              <i class="fas fa-expand"></i> Fullscreen
            </button>
            <button class="control-btn" onclick="reloadVideo()" title="Reload Video">
              <i class="fas fa-redo"></i> Reload
            </button>
            <button class="control-btn close-btn" onclick="window.close()" title="Close Player">
              <i class="fas fa-times"></i> Close
            </button>
          </div>
        </div>
        
        <div class="video-container">
          <div class="loading-spinner">
            <i class="fas fa-spinner"></i>
            <div style="margin-top: 10px; font-size: 14px;">Loading video...</div>
          </div>
          <div class="video-wrapper" id="videoWrapper">
            ${window.currentEmbedCode}
          </div>
        </div>
        
        <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/js/all.min.js"></script>
        <script>
          let isFullscreen = false;
          
          function toggleFullscreen() {
            const elem = document.documentElement;
            const btn = document.querySelector('.fullscreen-btn i');
            
            if (!isFullscreen) {
              if (elem.requestFullscreen) {
                elem.requestFullscreen();
              } else if (elem.webkitRequestFullscreen) {
                elem.webkitRequestFullscreen();
              } else if (elem.msRequestFullscreen) {
                elem.msRequestFullscreen();
              }
              btn.className = 'fas fa-compress';
              isFullscreen = true;
            } else {
              if (document.exitFullscreen) {
                document.exitFullscreen();
              } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
              } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
              }
              btn.className = 'fas fa-expand';
              isFullscreen = false;
            }
          }
          
          function reloadVideo() {
            const wrapper = document.getElementById('videoWrapper');
            const currentHTML = wrapper.innerHTML;
            wrapper.innerHTML = '';
            setTimeout(() => {
              wrapper.innerHTML = currentHTML;
              setupIframe();
            }, 100);
          }
          
          function setupIframe() {
            const iframe = document.querySelector('iframe');
            if (iframe) {
              // Enhanced iframe attributes for better video playback
              iframe.setAttribute('allowfullscreen', 'true');
              iframe.setAttribute('webkitallowfullscreen', 'true');
              iframe.setAttribute('mozallowfullscreen', 'true');
              iframe.setAttribute('allow', 'autoplay; fullscreen; picture-in-picture; encrypted-media; gyroscope; accelerometer');
              iframe.setAttribute('sandbox', 'allow-same-origin allow-scripts allow-popups allow-forms allow-presentation');
              iframe.style.width = '100%';
              iframe.style.height = '100%';
              iframe.style.border = 'none';
              
              // Hide loading spinner when iframe loads
              iframe.onload = function() {
                document.querySelector('.loading-spinner').style.display = 'none';
              };
              
              iframe.onerror = function() {
                document.querySelector('.loading-spinner').innerHTML = 
                  '<div class="error-message"><i class="fas fa-exclamation-triangle"></i><br>Failed to load video</div>';
              };
            }
          }
          
          // Setup iframe when page loads
          window.onload = function() {
            setupIframe();
          };
          
          // Handle fullscreen change events
          document.addEventListener('fullscreenchange', function() {
            const btn = document.querySelector('.fullscreen-btn i');
            if (document.fullscreenElement) {
              btn.className = 'fas fa-compress';
              isFullscreen = true;
            } else {
              btn.className = 'fas fa-expand';
              isFullscreen = false;
            }
          });
          
          // Keyboard shortcuts
          document.addEventListener('keydown', function(e) {
            switch(e.key) {
              case 'Escape':
                if (isFullscreen) {
                  toggleFullscreen();
                } else {
                  window.close();
                }
                break;
              case 'F11':
                e.preventDefault();
                toggleFullscreen();
                break;
              case 'r':
              case 'R':
                if (e.ctrlKey) {
                  e.preventDefault();
                  reloadVideo();
                }
                break;
            }
          });
          
          // Prevent context menu on video
          document.addEventListener('contextmenu', function(e) {
            e.preventDefault();
          });
        </script>
      </body>
      </html>
    `

    // Write the HTML to the popup window
    videoPopupWindow.document.write(playerHTML)
    videoPopupWindow.document.close()

    // Focus the popup window
    videoPopupWindow.focus()

    showToast("Video player opened in new window", "success")

    // Monitor popup window
    const checkClosed = setInterval(() => {
      if (videoPopupWindow.closed) {
        clearInterval(checkClosed)
        videoPopupWindow = null
        console.log("Video popup closed")
      }
    }, 1000)
  } catch (error) {
    console.error("Error opening video popup:", error)
    showToast("Failed to open video player", "error")
    // Fallback to full page player
    openFullPagePlayer()
  }
}

// Fallback full page player (enhanced version)
function openFullPagePlayer() {
  console.log("Opening fallback full page player...")

  if (!window.currentEmbedCode) {
    showToast("Video not available", "error")
    return
  }

  // Remove existing player if it exists
  const existingPlayer = document.getElementById("full-page-player")
  if (existingPlayer) {
    existingPlayer.remove()
  }

  const title = window.currentVideoTitle || currentMovie.title

  const playerOverlay = document.createElement("div")
  playerOverlay.id = "full-page-player"
  playerOverlay.className = "fixed inset-0 z-50 bg-black"
  playerOverlay.innerHTML = `
    <div class="flex flex-col h-full">
      <div class="bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-4 flex justify-between items-center border-b border-gray-700">
        <div class="flex items-center space-x-3">
          <i class="fas fa-play-circle text-red-500 text-xl"></i>
          <h3 class="text-white font-semibold text-lg">${title}</h3>
        </div>
        <div class="flex space-x-2">
          <button onclick="reloadFullPageVideo()" class="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors">
            <i class="fas fa-redo mr-2"></i>Reload
          </button>
          <button onclick="closeFullPagePlayer()" class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors">
            <i class="fas fa-times mr-2"></i>Close
          </button>
        </div>
      </div>
      
      <div class="flex-1 relative bg-black">
        <div id="fullpage-loading" class="absolute inset-0 flex items-center justify-center">
          <div class="text-center">
            <i class="fas fa-spinner fa-spin text-4xl text-red-500 mb-4"></i>
            <p class="text-white">Loading video...</p>
          </div>
        </div>
        <div id="fullpage-video-container" class="w-full h-full">
          ${window.currentEmbedCode}
        </div>
      </div>
    </div>
  `

  document.body.appendChild(playerOverlay)
  document.body.style.overflow = "hidden"
  isFullPagePlayer = true

  // Setup iframe
  setTimeout(() => {
    const iframe = playerOverlay.querySelector("iframe")
    if (iframe) {
      iframe.setAttribute("allowfullscreen", "true")
      iframe.setAttribute("webkitallowfullscreen", "true")
      iframe.setAttribute("mozallowfullscreen", "true")
      iframe.setAttribute("allow", "autoplay; fullscreen; picture-in-picture; encrypted-media")
      iframe.style.width = "100%"
      iframe.style.height = "100%"
      iframe.style.border = "none"

      iframe.onload = () => {
        document.getElementById("fullpage-loading").style.display = "none"
        showToast("Video loaded successfully", "success")
      }

      iframe.onerror = () => {
        document.getElementById("fullpage-loading").innerHTML =
          '<div class="text-center"><i class="fas fa-exclamation-triangle text-4xl text-red-500 mb-4"></i><p class="text-white">Failed to load video</p></div>'
      }
    }
  }, 100)
}

function closeFullPagePlayer() {
  const player = document.getElementById("full-page-player")
  if (player) {
    player.remove()
    document.body.style.overflow = "auto"
    isFullPagePlayer = false
  }
}

function reloadFullPageVideo() {
  const container = document.getElementById("fullpage-video-container")
  const loading = document.getElementById("fullpage-loading")

  if (container && loading) {
    loading.style.display = "flex"
    container.innerHTML = ""

    setTimeout(() => {
      container.innerHTML = window.currentEmbedCode
      const iframe = container.querySelector("iframe")
      if (iframe) {
        iframe.setAttribute("allowfullscreen", "true")
        iframe.setAttribute("webkitallowfullscreen", "true")
        iframe.setAttribute("mozallowfullscreen", "true")
        iframe.setAttribute("allow", "autoplay; fullscreen; picture-in-picture; encrypted-media")
        iframe.style.width = "100%"
        iframe.style.height = "100%"
        iframe.style.border = "none"

        iframe.onload = () => {
          loading.style.display = "none"
        }
      }
    }, 500)
  }
}

// Keyboard shortcuts
document.addEventListener("keydown", (e) => {
  if (isFullPagePlayer && e.key === "Escape") {
    closeFullPagePlayer()
  }
})

// Error handling for missing functions
function toggleEpisodeSidebar() {
  console.log("Episode sidebar toggle")
}

function toggleSearch() {
  console.log("Search toggle")
}

// Global error handler
window.addEventListener("error", (e) => {
  console.error("JavaScript error:", e.error)
  if (e.error && e.error.message && e.error.message.includes("openVideoPlayer")) {
    showToast("Error opening video player", "error")
  }
})

// Cleanup on page unload
window.addEventListener("beforeunload", () => {
  if (videoPopupWindow && !videoPopupWindow.closed) {
    videoPopupWindow.close()
  }
})
