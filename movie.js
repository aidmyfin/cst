// Movie page JavaScript with enhanced functionality

let currentMovie = null
let currentEpisode = null
let isFullPagePlayer = false

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
  initializeFullPagePlayer()
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

function hasEmbeddedVideo(movie, episodeIndex = null) {
  if (episodeIndex !== null && movie.multipleDownloads && movie.multipleDownloads[episodeIndex]) {
    const episode = movie.multipleDownloads[episodeIndex]
    return !!(episode.embedCode || episode.videoUrl)
  }
  return !!(movie.embedCode || movie.videoUrl)
}

function getVideoSource(movie, episodeIndex = null) {
  if (episodeIndex !== null && movie.multipleDownloads && movie.multipleDownloads[episodeIndex]) {
    const episode = movie.multipleDownloads[episodeIndex]
    return {
      embedCode: episode.embedCode,
      videoUrl: episode.videoUrl,
      title: `${movie.title} - ${episode.label}`,
    }
  }
  return {
    embedCode: movie.embedCode,
    videoUrl: movie.videoUrl,
    title: movie.title,
  }
}

function loadMoviePlayer(episodeParam) {
  console.log("Loading movie player...")

  const mobilePlayer = document.getElementById("mobile-player")
  const desktopPlayer = document.getElementById("desktop-player")

  let episodeIndex = null
  if (episodeParam && currentMovie.multipleDownloads) {
    episodeIndex = Number.parseInt(episodeParam) - 1
    if (episodeIndex >= 0 && episodeIndex < currentMovie.multipleDownloads.length) {
      currentEpisode = episodeIndex
    } else {
      episodeIndex = null
    }
  }

  const videoSource = getVideoSource(currentMovie, episodeIndex)
  const hasVideo = hasEmbeddedVideo(currentMovie, episodeIndex)

  // Store current video info globally
  window.currentEmbedCode = videoSource.embedCode
  window.currentVideoUrl = videoSource.videoUrl
  window.hasEmbeddedVideo = hasVideo

  // Create player HTML
  let playerHTML = ""

  if (hasVideo) {
    playerHTML = `
      <div class="player-container relative">
        <div class="player-placeholder bg-gray-800 flex flex-col items-center justify-center h-full cursor-pointer hover:bg-gray-700 transition-colors" onclick="handlePlayClick()">
          <div class="play-icon bg-red-600 rounded-full w-16 h-16 flex items-center justify-center mb-4 hover:bg-red-700 transition-colors">
            <i class="fas fa-play text-2xl text-white ml-1"></i>
          </div>
          <h3 class="text-xl font-bold mb-2 text-center px-4">${videoSource.title}</h3>
          <p class="text-gray-400 text-center px-4">Click to watch in full screen</p>
          <div class="player-preview mt-4 bg-red-600/20 px-4 py-2 rounded-lg">
            <i class="fas fa-expand text-sm mr-2"></i>
            Streaming Available
          </div>
        </div>
      </div>
    `
  } else {
    // Only download available
    playerHTML = `
      <div class="player-container relative">
        <div class="player-placeholder bg-gray-800 flex flex-col items-center justify-center h-full cursor-pointer hover:bg-gray-700 transition-colors" onclick="handlePlayClick()">
          <div class="play-icon bg-gray-600 rounded-full w-16 h-16 flex items-center justify-center mb-4 hover:bg-red-700 transition-colors">
            <i class="fas fa-download text-2xl text-white"></i>
          </div>
          <h3 class="text-xl font-bold mb-2 text-center px-4">${videoSource.title}</h3>
          <p class="text-gray-400 text-center px-4">Click to download</p>
          <div class="player-preview mt-4 bg-gray-600/20 px-4 py-2 rounded-lg">
            <i class="fas fa-download text-sm mr-2"></i>
            Download Only
          </div>
        </div>
      </div>
    `
  }

  if (mobilePlayer) mobilePlayer.innerHTML = playerHTML
  if (desktopPlayer) desktopPlayer.innerHTML = playerHTML

  console.log(
    "Player loaded - hasVideo:",
    hasVideo,
    "embedCode:",
    !!videoSource.embedCode,
    "videoUrl:",
    !!videoSource.videoUrl,
  )
}

function handlePlayClick() {
  console.log("Play clicked - hasEmbeddedVideo:", window.hasEmbeddedVideo)

  if (window.hasEmbeddedVideo) {
    openFullPagePlayer()
  } else {
    downloadMovie()
  }
}

function loadMovieInfo() {
  console.log("Loading movie info...")

  const mobileInfo = document.getElementById("mobile-movie-info")
  const desktopInfo = document.getElementById("desktop-movie-info")

  // Check if movie has embedded video
  const hasVideo = hasEmbeddedVideo(currentMovie, currentEpisode)
  const watchButtonText = hasVideo ? "Watch Now" : "Download"
  const watchButtonIcon = hasVideo ? "fa-play" : "fa-download"

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
      <button onclick="handlePlayClick()" class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded flex items-center space-x-2 transition-colors">
        <i class="fas ${watchButtonIcon}"></i>
        <span>${watchButtonText}</span>
      </button>
      ${
        hasVideo
          ? `
        <button onclick="downloadMovie()" class="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded flex items-center space-x-2 transition-colors">
          <i class="fas fa-download"></i>
          <span>Download</span>
        </button>
      `
          : ""
      }
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
              <p class="text-gray-400 text-sm">${hasEmbeddedVideo(currentMovie, index) ? "Click to watch" : "Click to download"}</p>
            </div>
            <div class="text-red-400 ml-2">
              <i class="fas ${hasEmbeddedVideo(currentMovie, index) ? "fa-play" : "fa-download"}"></i>
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

  // Update global video info
  const videoSource = getVideoSource(currentMovie, episodeIndex)
  window.currentEmbedCode = videoSource.embedCode
  window.currentVideoUrl = videoSource.videoUrl
  window.hasEmbeddedVideo = hasEmbeddedVideo(currentMovie, episodeIndex)

  // Update player
  loadMoviePlayer(episodeIndex + 1)
  loadMovieInfo()

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

  showToast(`Selected: ${episode.label}`, "success")
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
            ${currentMovie.cast.map((actor) => `<div class="text-gray-300">${actor}</div>`).join("")}
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
  let title = currentMovie.title

  // If we're viewing an episode, get the episode's download URL
  if (currentEpisode !== null && currentMovie.multipleDownloads) {
    const episode = currentMovie.multipleDownloads[currentEpisode]
    downloadUrl = episode.url || episode.downloadUrl || downloadUrl
    title = `${currentMovie.title} - ${episode.label}`
  }

  if (downloadUrl) {
    window.open(downloadUrl, "_blank")
    showToast(`Starting download: ${title}`, "success")
  } else {
    showToast("Download not available", "error")
  }
}

function downloadEpisode(episodeIndex) {
  const episode = currentMovie.multipleDownloads[episodeIndex]
  if (episode.url || episode.downloadUrl) {
    window.open(episode.url || episode.downloadUrl, "_blank")
    showToast(`Starting download: ${episode.label}`, "success")
  } else {
    showToast("Download not available for this episode", "error")
  }
}

// Full Page Player Functions
function initializeFullPagePlayer() {
  console.log("Initializing full page player...")

  if (!document.getElementById("full-page-player")) {
    const playerOverlay = document.createElement("div")
    playerOverlay.id = "full-page-player"
    playerOverlay.className = "full-page-player hidden"
    playerOverlay.innerHTML = `
      <div class="player-header">
        <div class="player-title">
          <h3 id="player-movie-title">Movie Player</h3>
          <span id="player-episode-info"></span>
        </div>
        <div class="player-controls-top">
          <button onclick="minimizePlayer()" class="control-btn minimize-btn" title="Minimize">
            <i class="fas fa-window-minimize"></i>
          </button>
          <button onclick="openInNewTab()" class="control-btn new-tab-btn" title="Open in New Tab">
            <i class="fas fa-external-link-alt"></i>
          </button>
          <button onclick="toggleFullscreen()" class="control-btn fullscreen-btn" title="Toggle Fullscreen">
            <i class="fas fa-expand"></i>
          </button>
          <button onclick="closeFullPagePlayer()" class="control-btn close-btn" title="Close">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>
      
      <div class="player-content">
        <div class="video-container" id="video-container">
          <div class="video-loading">
            <i class="fas fa-spinner fa-spin"></i>
            <p>Loading video...</p>
          </div>
        </div>
      </div>
    `
    document.body.appendChild(playerOverlay)
  }
}

function openFullPagePlayer() {
  console.log("Opening full page player...")
  console.log("Current embed code:", window.currentEmbedCode)
  console.log("Current video URL:", window.currentVideoUrl)

  // Check if we have embedded video available
  if (!window.currentEmbedCode && !window.currentVideoUrl) {
    showToast("Video not available - redirecting to download", "info")
    downloadMovie()
    return
  }

  const player = document.getElementById("full-page-player")
  const videoContainer = document.getElementById("video-container")
  const playerTitle = document.getElementById("player-movie-title")
  const episodeInfo = document.getElementById("player-episode-info")

  if (!player || !videoContainer) {
    console.error("Player elements not found")
    return
  }

  // Update player title
  if (currentEpisode !== null && currentMovie.multipleDownloads) {
    const episode = currentMovie.multipleDownloads[currentEpisode]
    playerTitle.textContent = currentMovie.title
    episodeInfo.textContent = episode.label
  } else {
    playerTitle.textContent = currentMovie.title
    episodeInfo.textContent = ""
  }

  // Load video - prioritize embedCode over videoUrl
  let videoContent = ""
  if (window.currentEmbedCode) {
    console.log("Loading with embed code")
    videoContent = `
      <div class="embedded-video">
        ${window.currentEmbedCode}
      </div>
    `
  } else if (window.currentVideoUrl) {
    console.log("Loading with video URL")
    videoContent = `
      <div class="embedded-video">
        <iframe src="${window.currentVideoUrl}" width="100%" height="100%" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>
      </div>
    `
  } else {
    console.error("No video source available")
    showToast("No video source available", "error")
    return
  }

  videoContainer.innerHTML = videoContent

  // Show player
  player.classList.remove("hidden")
  isFullPagePlayer = true
  document.body.style.overflow = "hidden"

  showToast("Video player opened", "success")
}

function closeFullPagePlayer() {
  console.log("Closing full page player...")

  const player = document.getElementById("full-page-player")
  if (player) {
    player.classList.add("hidden")
    isFullPagePlayer = false
    document.body.style.overflow = "auto"

    // Reset fullscreen if active
    if (document.fullscreenElement) {
      document.exitFullscreen()
    }
  }
}

function minimizePlayer() {
  const player = document.getElementById("full-page-player")
  if (player) {
    player.classList.toggle("minimized")
    showToast(player.classList.contains("minimized") ? "Player minimized" : "Player restored", "info")
  }
}

function openInNewTab() {
  let videoUrl = window.currentVideoUrl

  if (window.currentEmbedCode && !videoUrl) {
    // Extract URL from iframe if possible
    const iframeMatch = window.currentEmbedCode.match(/src="([^"]+)"/)
    if (iframeMatch) {
      videoUrl = iframeMatch[1]
    }
  }

  if (videoUrl) {
    window.open(videoUrl, "_blank")
    showToast("Video opened in new tab", "success")
  } else {
    showToast("Cannot open video in new tab", "error")
  }
}

function toggleFullscreen() {
  const player = document.getElementById("full-page-player")
  const fullscreenIcon = document.querySelector(".fullscreen-btn i")

  if (!document.fullscreenElement) {
    player
      .requestFullscreen()
      .then(() => {
        if (fullscreenIcon) {
          fullscreenIcon.classList.remove("fa-expand")
          fullscreenIcon.classList.add("fa-compress")
        }
      })
      .catch((err) => {
        console.error("Error attempting to enable fullscreen:", err)
        showToast("Fullscreen not supported", "error")
      })
  } else {
    document.exitFullscreen().then(() => {
      if (fullscreenIcon) {
        fullscreenIcon.classList.remove("fa-compress")
        fullscreenIcon.classList.add("fa-expand")
      }
    })
  }
}

// Keyboard shortcuts
document.addEventListener("keydown", (e) => {
  if (!isFullPagePlayer) return

  switch (e.key) {
    case "Escape":
      closeFullPagePlayer()
      break
    case "f":
    case "F":
      e.preventDefault()
      toggleFullscreen()
      break
    case "m":
    case "M":
      e.preventDefault()
      minimizePlayer()
      break
  }
})

// Error handling for missing functions
function toggleEpisodeSidebar() {
  console.log("Episode sidebar toggle")
}

function toggleSearch() {
  console.log("Search toggle")
}
