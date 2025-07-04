// Movie page JavaScript with enhanced full-page video player

let currentMovie = null
let currentEpisode = null
let isFullPagePlayer = false
const playerInstance = null

// Declare getUrlParameter function
function getUrlParameter(name) {
  name = name.replace(/[[]/, "\\[").replace(/[\]]/, "\\]")
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)")
  var results = regex.exec(location.search)
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "))
}

// Declare showError function
function showError(element, message) {
  element.innerHTML = `<div class="error-message text-center py-8">
    <div class="text-6xl mb-4">😞</div>
    <h2 class="text-2xl font-bold text-white mb-4">Oops!</h2>
    <div class="text-gray-400">${message}</div>
  </div>`
}

// Declare renderMovieGrid function
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

// Declare showToast function
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
      if (document.body.contains(toast)) {
        document.body.removeChild(toast)
      }
    }, 300)
  }, 3000)
}

// Navigation function
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

document.addEventListener("DOMContentLoaded", () => {
  initializeMoviePage()
  initializeTabs()
  initializeFullPagePlayer()
})

function initializeMoviePage() {
  const slug = getUrlParameter("slug")
  const episodeParam = getUrlParameter("episode")

  if (!slug) {
    window.location.href = "index.html"
    return
  }

  currentMovie = window.movieData.getMovieBySlug(slug)

  if (!currentMovie) {
    showError(document.querySelector("main"), "Movie not found")
    return
  }

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
}

function loadMoviePlayer(episodeParam) {
  const mobilePlayer = document.getElementById("mobile-player")
  const desktopPlayer = document.getElementById("desktop-player")

  let embedCode = currentMovie.embedCode
  let title = currentMovie.title
  let hasEmbed = false

  // Handle episodes for TV series
  if (currentMovie.multipleDownloads && episodeParam) {
    const episodeIndex = Number.parseInt(episodeParam) - 1
    if (episodeIndex >= 0 && episodeIndex < currentMovie.multipleDownloads.length) {
      const episode = currentMovie.multipleDownloads[episodeIndex]
      embedCode = episode.embedCode
      title = `${currentMovie.title} - ${episode.label}`
      currentEpisode = episodeIndex
      hasEmbed = !!episode.embedCode
    }
  } else if (currentMovie.embedCode) {
    hasEmbed = true
  }

  // Create player HTML
  let playerHTML = ""

  if (hasEmbed && embedCode) {
    // Show play button that opens full-page player
    playerHTML = `
      <div class="player-container">
        <div class="player-placeholder" onclick="openFullPagePlayer()">
          <div class="play-icon">
            <i class="fas fa-play text-4xl"></i>
          </div>
          <h3 class="text-xl font-bold mb-2">${title}</h3>
          <p class="text-gray-400">Click to watch in full screen</p>
          <div class="player-preview">
            <i class="fas fa-expand text-sm mr-2"></i>
            Full Screen Player Available
          </div>
        </div>
      </div>
    `
  } else {
    // Show play button placeholder
    playerHTML = `
      <div class="player-container">
        <div class="player-placeholder">
          <div class="play-icon" onclick="startPlayer()">
            <i class="fas fa-play text-2xl"></i>
          </div>
          <h3 class="text-xl font-bold mb-2">${title}</h3>
          <p class="text-gray-400">Click to start watching</p>
        </div>
      </div>
    `
  }

  if (mobilePlayer) mobilePlayer.innerHTML = playerHTML
  if (desktopPlayer) desktopPlayer.innerHTML = playerHTML

  // Store embed code for later use
  window.currentEmbedCode = embedCode
}

function startPlayer() {
  if (!window.currentEmbedCode) {
    showToast("Video not available", "error")
    return
  }

  openFullPagePlayer()
}

// Full Page Player Functions
function initializeFullPagePlayer() {
  // Create full page player overlay if it doesn't exist
  if (!document.getElementById("full-page-player")) {
    const playerOverlay = document.createElement("div")
    playerOverlay.id = "full-page-player"
    playerOverlay.className = "full-page-player hidden"
    playerOverlay.innerHTML = `
      <div class="player-header">
        <div class="player-title">
          <h3 id="player-movie-title">${currentMovie?.title || "Movie Player"}</h3>
          <span id="player-episode-info"></span>
        </div>
        <div class="player-controls-top">
          <button onclick="minimizePlayer()" class="control-btn" title="Minimize">
            <i class="fas fa-minus"></i>
          </button>
          <button onclick="openInNewTab()" class="control-btn" title="Open in New Tab">
            <i class="fas fa-external-link-alt"></i>
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
        
        <div class="player-controls-bottom">
          <div class="playback-controls">
            <button onclick="previousEpisode()" class="control-btn" title="Previous Episode" id="prev-episode-btn">
              <i class="fas fa-step-backward"></i>
            </button>
            <button onclick="rewind()" class="control-btn" title="Rewind 10s">
              <i class="fas fa-backward"></i>
            </button>
            <button onclick="togglePlayPause()" class="control-btn play-pause-btn" title="Play/Pause" id="play-pause-btn">
              <i class="fas fa-play"></i>
            </button>
            <button onclick="fastForward()" class="control-btn" title="Forward 10s">
              <i class="fas fa-forward"></i>
            </button>
            <button onclick="nextEpisode()" class="control-btn" title="Next Episode" id="next-episode-btn">
              <i class="fas fa-step-forward"></i>
            </button>
          </div>
          
          <div class="volume-controls">
            <button onclick="toggleMute()" class="control-btn" title="Mute/Unmute" id="mute-btn">
              <i class="fas fa-volume-up"></i>
            </button>
            <input type="range" class="volume-slider" min="0" max="100" value="100" onchange="setVolume(this.value)">
          </div>
          
          <div class="player-options">
            <select onchange="changePlaybackSpeed(this.value)" class="speed-selector">
              <option value="0.5">0.5x</option>
              <option value="0.75">0.75x</option>
              <option value="1" selected>1x</option>
              <option value="1.25">1.25x</option>
              <option value="1.5">1.5x</option>
              <option value="2">2x</option>
            </select>
            <button onclick="toggleFullscreen()" class="control-btn" title="Fullscreen" id="fullscreen-btn">
              <i class="fas fa-expand"></i>
            </button>
          </div>
        </div>
      </div>
      
      <div class="episode-sidebar" id="episode-sidebar">
        <div class="sidebar-header">
          <h4>Episodes</h4>
          <button onclick="toggleEpisodeSidebar()" class="control-btn">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="episode-list" id="full-player-episode-list">
          <!-- Episodes will be loaded here -->
        </div>
      </div>
    `
    document.body.appendChild(playerOverlay)
  }
}

function openFullPagePlayer() {
  if (!window.currentEmbedCode) {
    showToast("Video not available", "error")
    return
  }

  const player = document.getElementById("full-page-player")
  const videoContainer = document.getElementById("video-container")
  const playerTitle = document.getElementById("player-movie-title")
  const episodeInfo = document.getElementById("player-episode-info")

  if (!player || !videoContainer) return

  // Update player title
  if (currentEpisode !== null && currentMovie.multipleDownloads) {
    const episode = currentMovie.multipleDownloads[currentEpisode]
    playerTitle.textContent = currentMovie.title
    episodeInfo.textContent = episode.label
  } else {
    playerTitle.textContent = currentMovie.title
    episodeInfo.textContent = ""
  }

  // Load video
  videoContainer.innerHTML = `
    <div class="embedded-video">
      ${window.currentEmbedCode}
    </div>
  `

  // Load episodes if available
  loadFullPlayerEpisodes()

  // Show player
  player.classList.remove("hidden")
  isFullPagePlayer = true
  document.body.style.overflow = "hidden"

  // Update episode navigation buttons
  updateEpisodeButtons()

  showToast("Video loaded successfully", "success")
}

function closeFullPagePlayer() {
  const player = document.getElementById("full-page-player")
  if (player) {
    player.classList.add("hidden")
    isFullPagePlayer = false
    document.body.style.overflow = "auto"
  }
}

function minimizePlayer() {
  const player = document.getElementById("full-page-player")
  if (player) {
    player.classList.add("minimized")
    showToast("Player minimized", "info")
  }
}

function openInNewTab() {
  if (window.currentEmbedCode) {
    const videoUrl = extractVideoUrl(window.currentEmbedCode)
    if (videoUrl) {
      window.open(videoUrl, "_blank")
      showToast("Opened in new tab", "success")
    } else {
      showToast("Unable to open in new tab", "error")
    }
  }
}

function extractVideoUrl(embedCode) {
  const srcMatch = embedCode.match(/src=["']([^"']+)["']/i)
  return srcMatch ? srcMatch[1] : null
}

function togglePlayPause() {
  const iframe = document.querySelector("#video-container iframe")
  const btn = document.getElementById("play-pause-btn")

  if (iframe) {
    // For embedded videos, we can't directly control play/pause
    // This is a limitation of embedded content
    showToast("Use video controls to play/pause", "info")
  }
}

function rewind() {
  showToast("Rewind 10 seconds", "info")
  // Note: Direct control of embedded videos is limited
}

function fastForward() {
  showToast("Forward 10 seconds", "info")
  // Note: Direct control of embedded videos is limited
}

function toggleMute() {
  const btn = document.getElementById("mute-btn")
  const icon = btn.querySelector("i")

  if (icon.classList.contains("fa-volume-up")) {
    icon.className = "fas fa-volume-mute"
    showToast("Muted", "info")
  } else {
    icon.className = "fas fa-volume-up"
    showToast("Unmuted", "info")
  }
}

function setVolume(value) {
  showToast(`Volume: ${value}%`, "info")
  // Note: Direct volume control of embedded videos is limited
}

function changePlaybackSpeed(speed) {
  showToast(`Playback speed: ${speed}x`, "info")
  // Note: Direct speed control of embedded videos is limited
}

function toggleFullscreen() {
  const player = document.getElementById("full-page-player")
  const btn = document.getElementById("fullscreen-btn")
  const icon = btn.querySelector("i")

  if (document.fullscreenElement) {
    document.exitFullscreen()
    icon.className = "fas fa-expand"
  } else {
    player.requestFullscreen()
    icon.className = "fas fa-compress"
  }
}

function loadFullPlayerEpisodes() {
  const episodeList = document.getElementById("full-player-episode-list")
  if (!episodeList || !currentMovie.multipleDownloads) return

  episodeList.innerHTML = currentMovie.multipleDownloads
    .map(
      (episode, index) => `
      <div class="episode-item ${currentEpisode === index ? "active" : ""}" onclick="playEpisodeInFullPlayer(${index})">
        <div class="episode-number">${index + 1}</div>
        <div class="episode-info">
          <div class="episode-title">${episode.label}</div>
          <div class="episode-status">
            ${currentEpisode === index ? '<i class="fas fa-play"></i> Now Playing' : "Click to play"}
          </div>
        </div>
      </div>
    `,
    )
    .join("")
}

function playEpisodeInFullPlayer(episodeIndex) {
  if (!currentMovie.multipleDownloads || episodeIndex < 0 || episodeIndex >= currentMovie.multipleDownloads.length) {
    return
  }

  currentEpisode = episodeIndex
  const episode = currentMovie.multipleDownloads[episodeIndex]
  window.currentEmbedCode = episode.embedCode

  // Update URL
  const url = new URL(window.location)
  url.searchParams.set("episode", episodeIndex + 1)
  window.history.pushState({}, "", url)

  // Update player
  const videoContainer = document.getElementById("video-container")
  const episodeInfo = document.getElementById("player-episode-info")

  if (episode.embedCode) {
    videoContainer.innerHTML = `
      <div class="embedded-video">
        ${episode.embedCode}
      </div>
    `
    episodeInfo.textContent = episode.label
  }

  // Update episode list
  loadFullPlayerEpisodes()
  updateEpisodeButtons()

  showToast(`Now playing: ${episode.label}`, "success")
}

function previousEpisode() {
  if (currentMovie.multipleDownloads && currentEpisode > 0) {
    playEpisodeInFullPlayer(currentEpisode - 1)
  } else {
    showToast("No previous episode", "warning")
  }
}

function nextEpisode() {
  if (currentMovie.multipleDownloads && currentEpisode < currentMovie.multipleDownloads.length - 1) {
    playEpisodeInFullPlayer(currentEpisode + 1)
  } else {
    showToast("No next episode", "warning")
  }
}

function updateEpisodeButtons() {
  const prevBtn = document.getElementById("prev-episode-btn")
  const nextBtn = document.getElementById("next-episode-btn")

  if (!currentMovie.multipleDownloads) {
    prevBtn.style.display = "none"
    nextBtn.style.display = "none"
    return
  }

  prevBtn.style.display = "block"
  nextBtn.style.display = "block"

  prevBtn.disabled = currentEpisode <= 0
  nextBtn.disabled = currentEpisode >= currentMovie.multipleDownloads.length - 1

  if (prevBtn.disabled) {
    prevBtn.style.opacity = "0.5"
  } else {
    prevBtn.style.opacity = "1"
  }

  if (nextBtn.disabled) {
    nextBtn.style.opacity = "0.5"
  } else {
    nextBtn.style.opacity = "1"
  }
}

function toggleEpisodeSidebar() {
  const sidebar = document.getElementById("episode-sidebar")
  if (sidebar) {
    sidebar.classList.toggle("visible")
  }
}

// Keyboard shortcuts
document.addEventListener("keydown", (e) => {
  if (!isFullPagePlayer) return

  switch (e.key) {
    case "Escape":
      closeFullPagePlayer()
      break
    case " ":
      e.preventDefault()
      togglePlayPause()
      break
    case "ArrowLeft":
      e.preventDefault()
      rewind()
      break
    case "ArrowRight":
      e.preventDefault()
      fastForward()
      break
    case "ArrowUp":
      e.preventDefault()
      if (currentMovie.multipleDownloads) previousEpisode()
      break
    case "ArrowDown":
      e.preventDefault()
      if (currentMovie.multipleDownloads) nextEpisode()
      break
    case "f":
    case "F":
      e.preventDefault()
      toggleFullscreen()
      break
    case "m":
    case "M":
      e.preventDefault()
      toggleMute()
      break
  }
})

function playEpisode(episodeIndex) {
  currentEpisode = episodeIndex
  const episode = currentMovie.multipleDownloads[episodeIndex]

  // Update URL
  const url = new URL(window.location)
  url.searchParams.set("episode", episodeIndex + 1)
  window.history.pushState({}, "", url)

  // Store current embed code
  window.currentEmbedCode = episode.embedCode

  // Update player with episode embed
  const players = document.querySelectorAll(".player-container")
  players.forEach((player) => {
    if (episode.embedCode) {
      player.innerHTML = `
        <div class="player-placeholder" onclick="openFullPagePlayer()">
          <div class="play-icon">
            <i class="fas fa-play text-4xl"></i>
          </div>
          <h3 class="text-xl font-bold mb-2">${currentMovie.title} - ${episode.label}</h3>
          <p class="text-gray-400">Click to watch in full screen</p>
          <div class="player-preview">
            <i class="fas fa-expand text-sm mr-2"></i>
            Full Screen Player Available
          </div>
        </div>
      `
    } else {
      player.innerHTML = `
        <div class="player-placeholder">
          <div class="play-icon" onclick="startPlayer()">
            <i class="fas fa-play text-2xl"></i>
          </div>
          <h3 class="text-xl font-bold mb-2">${currentMovie.title} - ${episode.label}</h3>
          <p class="text-gray-400">Click to start watching</p>
        </div>
      `
    }
  })

  // Update episode highlighting
  document.querySelectorAll(".episode-item").forEach((item, index) => {
    if (index === episodeIndex) {
      item.classList.add("bg-red-600")
      item.classList.remove("bg-gray-800")
    } else {
      item.classList.remove("bg-red-600")
      item.classList.add("bg-gray-800")
    }
  })

  showToast(`Now playing: ${episode.label}`, "success")
}

function initializeTabs() {
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
    btn.classList.remove("active", "bg-red-600")
    btn.classList.add("text-gray-400")
  })
  document.querySelector(`[data-tab="${tabName}"]`).classList.add("active", "bg-red-600", "text-white")

  // Update content
  document.querySelectorAll(".tab-content").forEach((content) => {
    content.classList.add("hidden")
  })
  document.getElementById(`${tabName}-tab`).classList.remove("hidden")
}

function switchDesktopTab(tabName) {
  // Update button states
  document.querySelectorAll(".desktop-tab-button").forEach((btn) => {
    btn.classList.remove("active", "bg-red-600")
    btn.classList.add("text-gray-400")
  })
  document
    .querySelector(`[data-tab="${tabName}"].desktop-tab-button`)
    .classList.add("active", "bg-red-600", "text-white")

  // Update content
  document.querySelectorAll(".desktop-tab-content").forEach((content) => {
    content.classList.add("hidden")
  })
  document.getElementById(`desktop-${tabName}-tab`).classList.remove("hidden")
}

function loadOverviewTab() {
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
  const mobileDownloads = document.getElementById("mobile-downloads")
  const desktopDownloads = document.getElementById("desktop-downloads")
  const desktopQuickDownload = document.getElementById("desktop-quick-download")

  let downloadsHTML = ""

  if (currentMovie.multipleDownloads && currentMovie.multipleDownloads.length > 0) {
    // TV Series with episodes
    downloadsHTML = `
            <div class="space-y-3">
                ${currentMovie.multipleDownloads
                  .map(
                    (episode, index) => `
                    <div class="bg-gray-800 p-4 rounded-lg">
                        <div class="flex items-center justify-between">
                            <div>
                                <h4 class="text-white font-medium">${episode.label}</h4>
                                <p class="text-gray-400 text-sm">Click to download</p>
                            </div>
                            <div class="flex space-x-2">
                                <button onclick="downloadEpisode(${index})" class="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm">
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
                        <button onclick="downloadMovie()" class="bg-red-600 hover:bg-red-700 text-white p-3 rounded text-center">
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
                <button onclick="downloadMovie()" class="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded text-sm">
                    <i class="fas fa-download mr-2"></i>
                    Download ${currentMovie.quality}
                </button>
            </div>
        `
  }
}

function loadCastTab() {
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
  const container = document.getElementById("related-movies")
  if (!container) return

  const relatedMovies = window.movieData.getRelatedMovies(currentMovie.id, currentMovie.genre, 8)
  renderMovieGrid(container, relatedMovies)
}

function loadMovieInfo() {
  const mobileInfo = document.getElementById("mobile-movie-info")
  const desktopInfo = document.getElementById("desktop-movie-info")

  const infoHTML = `
        <div class="flex items-start space-x-4 mb-4">
            <img src="${currentMovie.poster}" alt="${currentMovie.title}" class="w-20 h-30 object-cover rounded">
            <div class="flex-1">
                <h1 class="text-xl font-bold text-white mb-2">${currentMovie.title}</h1>
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
        <p class="text-gray-300 text-sm line-clamp-3">${currentMovie.description}</p>
        <div class="mt-4 flex flex-wrap gap-2">
            <button onclick="openFullPagePlayer()" class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded flex items-center space-x-2">
                <i class="fas fa-play"></i>
                <span>Watch Now</span>
            </button>
            <button onclick="downloadMovie()" class="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded flex items-center space-x-2">
                <i class="fas fa-download"></i>
                <span>Download</span>
            </button>
        </div>
    `

  if (mobileInfo) mobileInfo.innerHTML = infoHTML
  if (desktopInfo) desktopInfo.innerHTML = infoHTML
}

function loadEpisodes() {
  if (!currentMovie.multipleDownloads || !currentMovie.multipleDownloads.length) return

  const mobileEpisodes = document.getElementById("mobile-episodes")
  const desktopEpisodes = document.getElementById("desktop-episodes")
  const mobileEpisodesList = document.getElementById("mobile-episodes-list")
  const desktopEpisodesList = document.getElementById("desktop-episodes-list")

  const episodesHTML = currentMovie.multipleDownloads
    .map(
      (episode, index) => `
        <div class="episode-item bg-gray-800 hover:bg-gray-700 p-3 rounded cursor-pointer transition-colors ${currentEpisode === index ? "bg-red-600" : ""}" onclick="playEpisode(${index})">
            <div class="flex items-center justify-between">
                <div>
                    <h4 class="text-white font-medium">${episode.label}</h4>
                    <p class="text-gray-400 text-sm">Click to watch</p>
                </div>
                <div class="text-red-400">
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
}

function downloadMovie() {
  if (currentMovie.downloadUrl) {
    window.open(currentMovie.downloadUrl, "_blank")
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
    showToast("Download not available", "error")
  }
}
