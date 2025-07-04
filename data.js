// Sample movie data
const moviesData = [
  {
    id: 1,
    title: "Avengers: Endgame",
    slug: "avengers-endgame",
    poster: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1920/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg",
    year: 2019,
    duration: "181 min",
    rating: 8.4,
    quality: "4K",
    genre: ["Action", "Adventure", "Drama"],
    description:
      "After the devastating events of Avengers: Infinity War, the universe is in ruins due to the efforts of the Mad Titan, Thanos. With the help of remaining allies, the Avengers must assemble once more in order to undo Thanos' actions and restore order to the universe once and for all.",
    cast: ["Robert Downey Jr.", "Chris Evans", "Mark Ruffalo", "Chris Hemsworth", "Scarlett Johansson"],
    director: "Anthony Russo, Joe Russo",
    downloadUrl: "https://example.com/download/avengers-endgame",
    videoUrl: "https://example.com/watch/avengers-endgame",
    embedCode:
      '<iframe src="https://example.com/embed/avengers-endgame" width="100%" height="100%" allowfullscreen></iframe>',
    trending: true,
    featured: true,
    new: false,
  },
  {
    id: 2,
    title: "Spider-Man: No Way Home",
    slug: "spider-man-no-way-home",
    poster: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1920/14QbnygCuTO0vl7CAFmPf1fgZfV.jpg",
    year: 2021,
    duration: "148 min",
    rating: 8.2,
    quality: "4K",
    genre: ["Action", "Adventure", "Sci-Fi"],
    description:
      "Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super-hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.",
    cast: ["Tom Holland", "Zendaya", "Benedict Cumberbatch", "Jacob Batalon"],
    director: "Jon Watts",
    downloadUrl: "https://example.com/download/spider-man-no-way-home",
    videoUrl: "https://example.com/watch/spider-man-no-way-home",
    embedCode:
      '<iframe src="https://example.com/embed/spider-man-no-way-home" width="100%" height="100%" allowfullscreen></iframe>',
    trending: true,
    featured: true,
    new: true,
  },
  {
    id: 3,
    title: "The Batman",
    slug: "the-batman",
    poster: "https://image.tmdb.org/t/p/w500/b0PlSFdDwbyK0cf5RxwDpaOJQvQ.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1920/b0PlSFdDwbyK0cf5RxwDpaOJQvQ.jpg",
    year: 2022,
    duration: "176 min",
    rating: 7.8,
    quality: "4K",
    genre: ["Action", "Crime", "Drama"],
    description:
      "In his second year of fighting crime, Batman uncovers corruption in Gotham City that connects to his own family while facing a serial killer known as the Riddler.",
    cast: ["Robert Pattinson", "Zoë Kravitz", "Paul Dano", "Jeffrey Wright"],
    director: "Matt Reeves",
    downloadUrl: "https://example.com/download/the-batman",
    videoUrl: "https://example.com/watch/the-batman",
    embedCode:
      '<iframe src="https://example.com/embed/the-batman" width="100%" height="100%" allowfullscreen></iframe>',
    trending: true,
    featured: false,
    new: true,
  },
  {
    id: 4,
    title: "Top Gun: Maverick",
    slug: "top-gun-maverick",
    poster: "https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1920/odJ4hx6g6vBt4lBWKFD1tI8WS4x.jpg",
    year: 2022,
    duration: "130 min",
    rating: 8.3,
    quality: "4K",
    genre: ["Action", "Drama"],
    description:
      "After more than thirty years of service as one of the Navy's top aviators, Pete Mitchell is where he belongs, pushing the envelope as a courageous test pilot and dodging the advancement in rank that would ground him.",
    cast: ["Tom Cruise", "Miles Teller", "Jennifer Connelly", "Jon Hamm"],
    director: "Joseph Kosinski",
    downloadUrl: "https://example.com/download/top-gun-maverick",
    videoUrl: "https://example.com/watch/top-gun-maverick",
    embedCode:
      '<iframe src="https://example.com/embed/top-gun-maverick" width="100%" height="100%" allowfullscreen></iframe>',
    trending: true,
    featured: true,
    new: true,
  },
  {
    id: 5,
    title: "Dune",
    slug: "dune",
    poster: "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1920/s1FhiNPpEOUmhKKUjXHhzNHKnTt.jpg",
    year: 2021,
    duration: "155 min",
    rating: 8.0,
    quality: "4K",
    genre: ["Action", "Adventure", "Drama", "Sci-Fi"],
    description:
      "Paul Atreides, a brilliant and gifted young man born into a great destiny beyond his understanding, must travel to the most dangerous planet in the universe to ensure the future of his family and his people.",
    cast: ["Timothée Chalamet", "Rebecca Ferguson", "Oscar Isaac", "Josh Brolin"],
    director: "Denis Villeneuve",
    downloadUrl: "https://example.com/download/dune",
    videoUrl: "https://example.com/watch/dune",
    embedCode: '<iframe src="https://example.com/embed/dune" width="100%" height="100%" allowfullscreen></iframe>',
    trending: false,
    featured: true,
    new: false,
  },
  {
    id: 6,
    title: "Joker",
    slug: "joker",
    poster: "https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1920/n6bUvigpRFqSwmPp1m2YADdbRBc.jpg",
    year: 2019,
    duration: "122 min",
    rating: 8.4,
    quality: "HD",
    genre: ["Crime", "Drama", "Thriller"],
    description:
      "In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society. He then embarks on a downward spiral of revolution and bloody crime. This path brings him face-to-face with his alter-ego: the Joker.",
    cast: ["Joaquin Phoenix", "Robert De Niro", "Zazie Beetz", "Frances Conroy"],
    director: "Todd Phillips",
    downloadUrl: "https://example.com/download/joker",
    videoUrl: "https://example.com/watch/joker",
    embedCode: '<iframe src="https://example.com/embed/joker" width="100%" height="100%" allowfullscreen></iframe>',
    trending: false,
    featured: false,
    new: false,
  },
  {
    id: 7,
    title: "Inception",
    slug: "inception",
    poster: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1920/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
    year: 2010,
    duration: "148 min",
    rating: 8.8,
    quality: "HD",
    genre: ["Action", "Sci-Fi", "Thriller"],
    description:
      "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    cast: ["Leonardo DiCaprio", "Marion Cotillard", "Tom Hardy", "Ellen Page"],
    director: "Christopher Nolan",
    downloadUrl: "https://example.com/download/inception",
    videoUrl: "https://example.com/watch/inception",
    embedCode: '<iframe src="https://example.com/embed/inception" width="100%" height="100%" allowfullscreen></iframe>',
    trending: false,
    featured: true,
    new: false,
  },
  {
    id: 8,
    title: "The Dark Knight",
    slug: "the-dark-knight",
    poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1920/hqkIcbrOHL86UncnHIsHVcVmzue.jpg",
    year: 2008,
    duration: "152 min",
    rating: 9.0,
    quality: "HD",
    genre: ["Action", "Crime", "Drama"],
    description:
      "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart", "Michael Caine"],
    director: "Christopher Nolan",
    downloadUrl: "https://example.com/download/the-dark-knight",
    videoUrl: "https://example.com/watch/the-dark-knight",
    embedCode:
      '<iframe src="https://example.com/embed/the-dark-knight" width="100%" height="100%" allowfullscreen></iframe>',
    trending: false,
    featured: true,
    new: false,
  },
  {
    id: 9,
    title: "Interstellar",
    slug: "interstellar",
    poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1920/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
    year: 2014,
    duration: "169 min",
    rating: 8.6,
    quality: "4K",
    genre: ["Adventure", "Drama", "Sci-Fi"],
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain", "Michael Caine"],
    director: "Christopher Nolan",
    downloadUrl: "https://example.com/download/interstellar",
    videoUrl: "https://example.com/watch/interstellar",
    embedCode:
      '<iframe src="https://example.com/embed/interstellar" width="100%" height="100%" allowfullscreen></iframe>',
    trending: false,
    featured: false,
    new: false,
  },
  {
    id: 10,
    title: "Parasite",
    slug: "parasite",
    poster: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1920/TU9NIjwzjoKPwQHoHshkBcQZzr.jpg",
    year: 2019,
    duration: "132 min",
    rating: 8.6,
    quality: "HD",
    genre: ["Comedy", "Drama", "Thriller"],
    description:
      "A poor family, the Kims, con their way into becoming the servants of a rich family, the Parks. But their easy life gets complicated when their deception is threatened with exposure.",
    cast: ["Song Kang-ho", "Lee Sun-kyun", "Cho Yeo-jeong", "Choi Woo-shik"],
    director: "Bong Joon-ho",
    downloadUrl: "https://example.com/download/parasite",
    videoUrl: "https://example.com/watch/parasite",
    embedCode: '<iframe src="https://example.com/embed/parasite" width="100%" height="100%" allowfullscreen></iframe>',
    trending: false,
    featured: false,
    new: false,
  },
  // TV Series with episodes
  {
    id: 11,
    title: "Breaking Bad",
    slug: "breaking-bad",
    poster: "https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1920/tsRy63Mu5cu8etL1X7ZLyf7UP1M.jpg",
    year: 2008,
    duration: "47 min/episode",
    rating: 9.5,
    quality: "HD",
    genre: ["Crime", "Drama", "Thriller"],
    description:
      "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family's future.",
    cast: ["Bryan Cranston", "Aaron Paul", "Anna Gunn", "RJ Mitte"],
    director: "Vince Gilligan",
    trending: false,
    featured: true,
    new: false,
    multipleDownloads: [
      {
        label: "Season 1 Episode 1",
        url: "https://example.com/download/breaking-bad-s1e1",
        embedCode:
          '<iframe src="https://example.com/embed/breaking-bad-s1e1" width="100%" height="100%" allowfullscreen></iframe>',
      },
      {
        label: "Season 1 Episode 2",
        url: "https://example.com/download/breaking-bad-s1e2",
        embedCode:
          '<iframe src="https://example.com/embed/breaking-bad-s1e2" width="100%" height="100%" allowfullscreen></iframe>',
      },
      {
        label: "Season 1 Episode 3",
        url: "https://example.com/download/breaking-bad-s1e3",
        embedCode:
          '<iframe src="https://example.com/embed/breaking-bad-s1e3" width="100%" height="100%" allowfullscreen></iframe>',
      },
      {
        label: "Season 1 Episode 4",
        url: "https://example.com/download/breaking-bad-s1e4",
        embedCode:
          '<iframe src="https://example.com/embed/breaking-bad-s1e4" width="100%" height="100%" allowfullscreen></iframe>',
      },
      {
        label: "Season 1 Episode 5",
        url: "https://example.com/download/breaking-bad-s1e5",
        embedCode:
          '<iframe src="https://example.com/embed/breaking-bad-s1e5" width="100%" height="100%" allowfullscreen></iframe>',
      },
    ],
  },
  // Add more movies to reach a good collection
  {
    id: 12,
    title: "The Godfather",
    slug: "the-godfather",
    poster: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1920/tmU7GeKVybMWFButWEGl2M4GeiP.jpg",
    year: 1972,
    duration: "175 min",
    rating: 9.2,
    quality: "HD",
    genre: ["Crime", "Drama"],
    description:
      "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    cast: ["Marlon Brando", "Al Pacino", "James Caan", "Diane Keaton"],
    director: "Francis Ford Coppola",
    downloadUrl: "https://example.com/download/the-godfather",
    videoUrl: "https://example.com/watch/the-godfather",
    embedCode:
      '<iframe src="https://example.com/embed/the-godfather" width="100%" height="100%" allowfullscreen></iframe>',
    trending: false,
    featured: true,
    new: false,
  },
  {
    id: 13,
    title: "Pulp Fiction",
    slug: "pulp-fiction",
    poster: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1920/4cDFJr4HnXN5AdPw4AKrmLlMWdO.jpg",
    year: 1994,
    duration: "154 min",
    rating: 8.9,
    quality: "HD",
    genre: ["Crime", "Drama"],
    description:
      "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    cast: ["John Travolta", "Uma Thurman", "Samuel L. Jackson", "Bruce Willis"],
    director: "Quentin Tarantino",
    downloadUrl: "https://example.com/download/pulp-fiction",
    videoUrl: "https://example.com/watch/pulp-fiction",
    embedCode:
      '<iframe src="https://example.com/embed/pulp-fiction" width="100%" height="100%" allowfullscreen></iframe>',
    trending: false,
    featured: false,
    new: false,
  },
  {
    id: 14,
    title: "Forrest Gump",
    slug: "forrest-gump",
    poster: "https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1920/7c9UVPPiTPltouxRVY6N9uugaVA.jpg",
    year: 1994,
    duration: "142 min",
    rating: 8.8,
    quality: "HD",
    genre: ["Drama", "Romance"],
    description:
      "The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate and other historical events unfold from the perspective of an Alabama man with an IQ of 75.",
    cast: ["Tom Hanks", "Robin Wright", "Gary Sinise", "Sally Field"],
    director: "Robert Zemeckis",
    downloadUrl: "https://example.com/download/forrest-gump",
    videoUrl: "https://example.com/watch/forrest-gump",
    embedCode:
      '<iframe src="https://example.com/embed/forrest-gump" width="100%" height="100%" allowfullscreen></iframe>',
    trending: false,
    featured: false,
    new: false,
  },
  {
    id: 15,
    title: "The Matrix",
    slug: "the-matrix",
    poster: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1920/fNG7i7RqMErkcqhohV2a6cV1Ehy.jpg",
    year: 1999,
    duration: "136 min",
    rating: 8.7,
    quality: "4K",
    genre: ["Action", "Sci-Fi"],
    description:
      "A computer programmer is led to fight an underground war against powerful computers who have constructed his entire reality with a system called the Matrix.",
    cast: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss", "Hugo Weaving"],
    director: "Lana Wachowski, Lilly Wachowski",
    downloadUrl: "https://example.com/download/the-matrix",
    videoUrl: "https://example.com/watch/the-matrix",
    embedCode:
      '<iframe src="https://example.com/embed/the-matrix" width="100%" height="100%" allowfullscreen></iframe>',
    trending: false,
    featured: true,
    new: false,
  },
]

// Helper functions to filter movies
function getFeaturedMovies() {
  return moviesData.filter((movie) => movie.featured)
}

function getTrendingMovies() {
  return moviesData.filter((movie) => movie.trending)
}

function getNewMovies() {
  return moviesData.filter((movie) => movie.new)
}

function getMoviesByGenre(genre) {
  return moviesData.filter((movie) => movie.genre.includes(genre))
}

function getAllMovies() {
  return moviesData
}

function getMovieBySlug(slug) {
  return moviesData.find((movie) => movie.slug === slug)
}

function getMovieById(id) {
  return moviesData.find((movie) => movie.id === Number.parseInt(id))
}

function searchMovies(query, filters = {}) {
  let results = moviesData

  // Text search
  if (query) {
    const searchTerm = query.toLowerCase()
    results = results.filter(
      (movie) =>
        movie.title.toLowerCase().includes(searchTerm) ||
        movie.genre.some((g) => g.toLowerCase().includes(searchTerm)) ||
        (movie.cast && movie.cast.some((actor) => actor.toLowerCase().includes(searchTerm))) ||
        (movie.director && movie.director.toLowerCase().includes(searchTerm)),
    )
  }

  // Genre filter
  if (filters.genres && filters.genres.length > 0) {
    results = results.filter((movie) => filters.genres.some((genre) => movie.genre.includes(genre)))
  }

  // Year filter
  if (filters.yearRange) {
    const [minYear, maxYear] = filters.yearRange
    results = results.filter((movie) => movie.year >= minYear && movie.year <= maxYear)
  }

  // Rating filter
  if (filters.ratingRange) {
    const [minRating, maxRating] = filters.ratingRange
    results = results.filter((movie) => movie.rating >= minRating && movie.rating <= maxRating)
  }

  // Quality filter
  if (filters.quality && filters.quality.length > 0) {
    results = results.filter((movie) => filters.quality.includes(movie.quality))
  }

  return results
}

function getRelatedMovies(movieId, genres, limit = 6) {
  const currentMovie = getMovieById(movieId)
  if (!currentMovie) return []

  return moviesData
    .filter((movie) => movie.id !== movieId && movie.genre.some((genre) => genres.includes(genre)))
    .slice(0, limit)
}

function getMoviesByLetter(letter) {
  if (letter === "#") {
    return moviesData.filter((movie) => !/^[A-Za-z]/.test(movie.title))
  }
  return moviesData.filter((movie) => movie.title.toLowerCase().startsWith(letter.toLowerCase()))
}

// Export functions for use in other scripts
if (typeof window !== "undefined") {
  window.movieData = {
    moviesData,
    getFeaturedMovies,
    getTrendingMovies,
    getNewMovies,
    getMoviesByGenre,
    getAllMovies,
    getMovieBySlug,
    getMovieById,
    searchMovies,
    getRelatedMovies,
    getMoviesByLetter,
  }
}
