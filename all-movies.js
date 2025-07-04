// All Movies A-Z page JavaScript

document.addEventListener("DOMContentLoaded", () => {
  initializeAllMoviesPage()
})

function initializeAllMoviesPage() {
  generateAlphabetNavigation()
  loadMoviesByLetter()
  updateTotalMoviesCount()
}

function generateAlphabetNavigation() {
  const alphabetNav = document.getElementById("alphabet-nav")
  if (!alphabetNav) return

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")

  const navHTML =
    alphabet
      .map(
        (letter) => `
        <button class="alphabet-btn bg-gray-800 hover:bg-red-600 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors" 
                onclick="scrollToLetter('${letter}')" 
                data-letter="${letter}">
            ${letter}
        </button>
    `,
      )
      .join("") +
    `
        <button class="alphabet-btn bg-gray-800 hover:bg-red-600 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors" 
                onclick="scrollToLetter('#')" 
                data-letter="#">
            #
        </button>
    `

  alphabetNav.innerHTML = navHTML
}

function loadMoviesByLetter() {
  const container = document.getElementById("movies-by-letter")
  if (!container) return

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")
  const allMovies = window.movieData.getAllMovies()

  let sectionsHTML = ""

  // Group movies by first letter
  alphabet.forEach((letter) => {
    const moviesForLetter = window.movieData.getMoviesByLetter(letter)

    if (moviesForLetter.length > 0) {
      sectionsHTML += `
                <section id="letter-${letter}" class="letter-section">
                    <div class="flex items-center justify-between mb-6">
                        <h2 class="text-3xl font-bold text-white">${letter}</h2>
                        <span class="text-gray-400">${moviesForLetter.length} movie${moviesForLetter.length !== 1 ? "s" : ""}</span>
                    </div>
                    <div class="movie-grid">
                        ${moviesForLetter
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
                          .join("")}
                    </div>
                </section>
            `
    }
  })

  // Add movies starting with numbers/symbols
  const numbersMovies = window.movieData.getMoviesByLetter("#")
  if (numbersMovies.length > 0) {
    sectionsHTML += `
            <section id="letter-#" class="letter-section">
                <div class="flex items-center justify-between mb-6">
                    <h2 class="text-3xl font-bold text-white">#</h2>
                    <span class="text-gray-400">${numbersMovies.length} movie${numbersMovies.length !== 1 ? "s" : ""}</span>
                </div>
                <div class="movie-grid">
                    ${numbersMovies
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
                      .join("")}
                </div>
            </section>
        `
  }

  container.innerHTML = sectionsHTML
}

function updateTotalMoviesCount() {
  const totalMoviesElement = document.getElementById("total-movies")
  if (!totalMoviesElement) return

  const totalCount = window.movieData.getAllMovies().length
  totalMoviesElement.textContent = `Browse our complete collection of ${totalCount} movies`
}

function scrollToLetter(letter) {
  const section = document.getElementById(`letter-${letter}`)
  if (section) {
    section.scrollIntoView({ behavior: "smooth", block: "start" })

    // Update active state
    document.querySelectorAll(".alphabet-btn").forEach((btn) => {
      btn.classList.remove("bg-red-600")
      btn.classList.add("bg-gray-800")
    })

    const activeBtn = document.querySelector(`[data-letter="${letter}"]`)
    if (activeBtn) {
      activeBtn.classList.remove("bg-gray-800")
      activeBtn.classList.add("bg-red-600")
    }
  }
}
