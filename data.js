// Movie data with real content
const moviesData = [
  {
    id: "1",
    title: "Skincare (2024)",
    poster: "https://netnaija.xyz/wp-content/uploads/2024/09/Skincare-2024-Download-NetNaija.xyz_.webp",
    backdrop: "https://netnaija.xyz/wp-content/uploads/2024/09/Skincare-2024-Download-NetNaija.xyz_.webp",
    genre: ["Drama", "Thriller"],
    year: 2024,
    rating: 7.2,
    views: 125000,
    quality: "HD",
    slug: "skincare-2024",
    duration: "1h 38m",
    description:
      "Famed aesthetician Hope's skincare business faces sabotage when longtime rival Angel opens a boutique across the street. Aided by her friend Jordan, Hope seeks to uncover who's trying to ruin her reputation.",
    cast: ["Elizabeth Banks", "Lewis Pullman", "Luis Gerardo Méndez"],
    director: "Austin Peters",
    country: "United States",
    language: "English",
    downloadUrl: "https://netnaijafiles.xyz/9729b9572899b0fe/Skincare_(2024)_(NetNaija.xyz).mkv",
    isFeatured: true,
    isNew: true,
    isTrending: true,
  },
  {
    id: "2",
    title: "Dìdi (2024)",
    poster: "https://netnaija.xyz/wp-content/uploads/2024/09/Didi-2024-Download-NetNaija.xyz_.webp",
    backdrop: "https://netnaija.xyz/wp-content/uploads/2024/09/Didi-2024-Download-NetNaija.xyz_.webp",
    genre: ["Comedy", "Drama"],
    year: 2024,
    rating: 8.1,
    views: 89000,
    quality: "HD",
    slug: "didi-2024",
    duration: "1h 33m",
    description:
      "In 2008, during the last month of summer before high school begins, an impressionable 13-year-old Taiwanese American boy learns what his family can't teach him: how to skate, how to flirt, and how to love your mom.",
    cast: ["Izaac Wang", "Joan Chen", "Shirley Chen"],
    director: "Sean Wang",
    country: "United States",
    language: "English",
    downloadUrl: "https://netnaijafiles.xyz/d523df2f71926118/D%C3%ACdi_(2024)_(NetNaija.xyz).mkv",
    isNew: true,
  },
  {
    id: "6",
    title: "Trap (2024)",
    poster: "https://netnaija.xyz/wp-content/uploads/2024/08/Trap-2024-Download-NetNaija.xyz_.webp",
    backdrop: "https://netnaija.xyz/wp-content/uploads/2024/08/Trap-2024-Download-NetNaija.xyz_.webp",
    genre: ["Crime", "Horror", "Mystery", "Thriller"],
    year: 2024,
    rating: 8.3,
    views: 234000,
    quality: "4K",
    slug: "trap-2024",
    duration: "1h 45m",
    description:
      "A father and teen daughter attend a pop concert, where they realize they're at the center of a dark and sinister event.",
    cast: ["Josh Hartnett", "Ariel Donoghue", "Saleka"],
    director: "M. Night Shyamalan",
    country: "United States",
    language: "English",
    downloadUrl: "https://netnaijafiles.xyz/0e91dec87ca03aef/Trap_(2024)_(NetNaija.xyz).mkv",
    isFeatured: true,
    isTrending: true,
  },
  {
    id: "8",
    title: "Inside Out 2 (2024)",
    poster: "https://netnaija.xyz/wp-content/uploads/2024/08/Inside-Out-2-2024-Download-NetNaija.xyz_.webp",
    backdrop: "https://netnaija.xyz/wp-content/uploads/2024/08/Inside-Out-2-2024-Download-NetNaija.xyz_.webp",
    genre: ["Animation", "Family", "Adventure", "Comedy"],
    year: 2024,
    rating: 9.1,
    views: 456000,
    quality: "4K",
    slug: "inside-out-2-2024",
    duration: "1h 36m",
    description:
      "Teenager Riley's mind headquarters is undergoing a sudden demolition to make room for something entirely unexpected: new Emotions!",
    cast: ["Amy Poehler", "Maya Hawke", "Kensington Tallman"],
    country: "United States",
    language: "English",
    downloadUrl: "https://netnaijafiles.xyz/21a58a24f55d5b92/Inside_Out_2_(2024)_(NetNaija.xyz).mkv",
    isFeatured: true,
    isTrending: true,
  },
  {
    id: "33",
    title: "Raayan (2024)",
    poster: "https://netnaija.xyz/wp-content/uploads/2024/08/Raayan-2024-Download-NetNaija.xyz_.webp",
    backdrop: "https://netnaija.xyz/wp-content/uploads/2024/08/Raayan-2024-Download-NetNaija.xyz_.webp",
    genre: ["Action", "Drama", "Thriller"],
    year: 2024,
    rating: 8.4,
    views: 234000,
    quality: "HD",
    slug: "raayan-2024",
    duration: "2h 25m",
    description:
      "Raayan, a simpleton patriarch has to protect his family when they inadvertently get muddled in a violent world with whirlpool of murder, debauchery, feud, politics and power.",
    cast: ["Dhanush", "Dushara Vijayan", "Sundeep Kishan"],
    country: "India",
    language: "Tamil",
    downloadUrl: "https://netnaijafiles.xyz/20c40b5ac33470f8/Raayan_(2024)_(NetNaija.xyz).mkv",
    isFeatured: true,
    isTrending: true,
  },
  {
    id: "35",
    title: "Longlegs (2024)",
    poster: "https://netnaija.xyz/wp-content/uploads/2024/08/Longlegs-2024-Download-NetNaija.xyz_.webp",
    backdrop: "https://netnaija.xyz/wp-content/uploads/2024/08/Longlegs-2024-Download-NetNaija.xyz_.webp",
    genre: ["Crime", "Horror", "Thriller"],
    year: 2024,
    rating: 8.7,
    views: 298000,
    quality: "HD",
    slug: "longlegs-2024",
    duration: "1h 41m",
    description:
      "In pursuit of a serial killer, an FBI agent uncovers a series of occult clues that she must solve to end his terrifying killing spree.",
    cast: ["Maika Monroe", "Nicolas Cage", "Blair Underwood"],
    country: "United States",
    language: "English",
    downloadUrl: "https://netnaijafiles.xyz/c0443ae209ee19e7/Longlegs_(2024)_(NetNaija.xyz).mkv",
    isFeatured: true,
    isTrending: true,
  },
  {
    id: "36",
    title: "Kalki 2898 AD (2024)",
    poster: "https://netnaija.xyz/wp-content/uploads/2024/08/Kalki-2898-AD-2024-Download-NetNaija.xyz_.webp",
    backdrop: "https://netnaija.xyz/wp-content/uploads/2024/08/Kalki-2898-AD-2024-Download-NetNaija.xyz_.webp",
    genre: ["Drama", "Action", "Fantasy", "Sci-Fi"],
    year: 2024,
    rating: 8.9,
    views: 456000,
    quality: "4K",
    slug: "kalki-2898-ad-2024",
    duration: "3h 1m",
    description:
      "Bhairava, tired of the oppressive confines of his homeland and the perilous life of a bounty hunter, yearns for a more comfortable existence in the Complex.",
    cast: ["Amitabh Bachchan", "Prabhas", "Deepika Padukone"],
    country: "India",
    language: "Telugu",
    downloadUrl: "https://netnaijafiles.xyz/159f3e0823e78f29/Kalki_2898_AD_(2024)_(NetNaija.xyz).mkv",
    isFeatured: true,
    isTrending: true,
  },
  {
    id: "39",
    title: "Joker (2019)",
    poster: "https://netnaija.xyz/wp-content/uploads/2020/06/882HHK.jpg",
    backdrop: "https://netnaija.xyz/wp-content/uploads/2020/06/882HHK.jpg",
    genre: ["Crime", "Drama", "Thriller"],
    year: 2019,
    rating: 8.4,
    views: 2345000,
    quality: "4K",
    slug: "joker-2019",
    duration: "2h 2m",
    description:
      "Forever alone in a crowd, failed comedian Arthur Fleck seeks connection as he walks the streets of Gotham City. Arthur wears two masks — the one he paints for his day job as a clown, and the guise he projects in a futile attempt to feel like he's part of the world around him.",
    cast: ["Joaquin Phoenix", "Robert De Niro", "Zazie Beetz"],
    country: "United States",
    language: "English",
    downloadUrl: "https://www.downloadbetter.com/YwpcEElGt63/joker-2019-netnaija-com-mp4.html",
    isFeatured: true,
    isTrending: true,
  },
  {
    id: "53",
    title: "Squid Game Season 3 (2025)",
    poster: "https://9jarocks.net/wp-content/uploads/2025/06/Squid-Game_Poster.jpg",
    backdrop: "https://9jarocks.net/wp-content/uploads/2025/06/Squid-Game_Poster.jpg",
    genre: ["Drama", "Thriller", "Survival", "Mystery"],
    year: 2025,
    rating: 8.6,
    views: 210000,
    quality: "HD",
    slug: "squid-game-season-3-2025",
    duration: "6 Episodes Available",
    description:
      "Hundreds of cash-strapped players accept a strange invitation to compete in children's games. A tempting prize awaits, but with deadly high stakes. Season 3 raises the danger and suspense to terrifying new levels.",
    cast: ["Lee Jung-jae", "Wi Ha-joon", "HoYeon Jung"],
    director: "Hwang Dong-hyuk",
    country: "South Korea",
    language: "Korean / English",
    multipleDownloads: [
      {
        label: "Episode 1",
        url: "https://strtape.tech/v/p4xXyxXj7Rfr31y/Squid.Game.S03E01.Dual.540p.x265.AAC.%5B9jaRocks.Com%5D_%282%29.mkv.mp4",
        embedCode:
          '<iframe src="https://strtape.tech/e/p4xXyxXj7Rfr31y/" width="800" height="600" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
      },
      {
        label: "Episode 2",
        url: "https://strtape.tech/v/w60QaqzRjwSJqYy/Squid.Game.S03E02.Dual.540p.x265.AAC.%5B9jaRocks.Com%5D_%282%29.mkv.mp4",
        embedCode:
          '<iframe src="https://strtape.tech/e/w60QaqzRjwSJqYy/" width="800" height="600" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
      },
      {
        label: "Episode 3",
        url: "https://strtape.tech/v/4qw0eBwzlXIK3P2/Squid.Game.S03E03.Dual.540p.x265.AAC.%5B9jaRocks.Com%5D_%282%29.mkv.mp4",
        embedCode:
          '<iframe src="https://strtape.tech/e/4qw0eBwzlXIK3P2/" width="800" height="600" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
      },
      {
        label: "Episode 4",
        url: "https://strtape.tech/v/6e94m1mmGKC9aGO/Squid.Game.S03E04.Dual.540p.x265.AAC.%5B9jaRocks.Com%5D_%282%29.mkv.mp4",
        embedCode:
          '<iframe src="https://strtape.tech/e/6e94m1mmGKC9aGO/" width="800" height="600" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
      },
      {
        label: "Episode 5",
        url: "https://strtape.tech/v/dQ6LrMpwR6uGYO/Squid.Game.S03E05.Dual.540p.x265.AAC.%5B9jaRocks.Com%5D_%282%29.mkv.mp4",
        embedCode:
          '<iframe src="https://strtape.tech/e/dQ6LrMpwR6uGYO/" width="800" height="600" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
      },
      {
        label: "Episode 6",
        url: "https://strtape.tech/v/dkMLzxO0a7HkpXl/Squid.Game.S03E06.Dual.540p.x265.AAC.%5B9jaRocks.Com%5D_%282%29.mkv.mp4",
        embedCode:
          '<iframe src="https://strtape.tech/e/dkMLzxO0a7HkpXl/" width="800" height="600" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
      },
    ],
    videoUrl: "https://strtape.tech/e/p4xXyxXj7Rfr31y/",
    downloadUrl:
      "https://strtape.tech/v/p4xXyxXj7Rfr31y/Squid.Game.S03E01.Dual.540p.x265.AAC.%5B9jaRocks.Com%5D_%282%29.mkv.mp4",
    embedCode:
      '<iframe src="https://strtape.tech/e/p4xXyxXj7Rfr31y/" width="800" height="600" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
    isNew: true,
    isTrending: true,
    isFeatured: true,
  },
  {
    id: "54",
    title: "Kings of JoBurg Season 1",
    poster: "https://9jarocks.net/wp-content/uploads/2023/01/5fc9fa7aa0dcb.jpg",
    backdrop: "https://9jarocks.net/wp-content/uploads/2023/01/5fc9fa7aa0dcb.jpg",
    genre: ["Crime", "Drama", "Fantasy", "Thriller"],
    year: 2021,
    rating: 7.5,
    views: 160000,
    quality: "WEBRip",
    slug: "kings-of-joburg-season-1",
    duration: "6 Episodes Available",
    description:
      "The Masire brothers rule Johannesburg's criminal underworld, but a supernatural family curse and a tangled web of betrayal threaten to destroy them.",
    cast: ["Shona Ferguson", "Zolisa Xaluva", "Sello Sebotsane"],
    director: "Shona Ferguson",
    country: "South Africa",
    language: "English",
    multipleDownloads: [
      {
        label: "Episode 1",
        url: "https://strtape.tech/v/dOOw7wmeayHkJAk/Kings.of.JoBurg.S01E01.480p.WEBRip.x265.%5B9jaRocks.Com%5D.mkv.mp4",
        embedCode:
          '<iframe src="https://strtape.tech/e/dOOw7wmeayHkJAk/" width="800" height="600" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
      },
      {
        label: "Episode 2",
        url: "https://strtape.tech/v/mDp3goQBqpUbgoM/Kings.of.JoBurg.S01E02.480p.WEBRip.x265.%5B9jaRocks.Com%5D.mkv.mp4",
        embedCode:
          '<iframe src="https://strtape.tech/e/mDp3goQBqpUbgoM/" width="800" height="600" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
      },
      {
        label: "Episode 3",
        url: "https://strtape.tech/v/abvkYQZor0fxXKA/Kings.of.JoBurg.S01E03.480p.WEBRip.x265.%5B9jaRocks.Com%5D.mkv.mp4",
        embedCode:
          '<iframe src="https://strtape.tech/e/abvkYQZor0fxXKA/" width="800" height="600" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
      },
      {
        label: "Episode 4",
        url: "https://strtape.tech/v/RBB6RoV2r7CdPdv/Kings.of.JoBurg.S01E04.480p.WEBRip.x265.%5B9jaRocks.Com%5D.mkv.mp4",
        embedCode:
          '<iframe src="https://strtape.tech/e/RBB6RoV2r7CdPdv/" width="800" height="600" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
      },
      {
        label: "Episode 5",
        url: "https://strtape.tech/v/zKXmOXPgoDhYMJm/Kings.of.JoBurg.S01E05.480p.WEBRip.x265.%5B9jaRocks.Com%5D.mkv.mp4",
        embedCode:
          '<iframe src="https://strtape.tech/e/zKXmOXPgoDhYMJm/" width="800" height="600" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
      },
    ],
    videoUrl: "https://strtape.tech/e/dOOw7wmeayHkJAk/",
    downloadUrl:
      "https://strtape.tech/v/dOOw7wmeayHkJAk/Kings.of.JoBurg.S01E01.480p.WEBRip.x265.%5B9jaRocks.Com%5D.mkv.mp4",
    embedCode:
      '<iframe src="https://strtape.tech/e/dOOw7wmeayHkJAk/" width="800" height="600" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
    isNew: false,
    isTrending: true,
    isFeatured: false,
  },
  {
    id: "56",
    title: "Heads of State",
    poster: "https://netnaija.xyz/wp-content/uploads/2025/07/Heads-of-State-2025-Download-NetNaija.xyz_-683x1024.webp",
    backdrop:
      "https://netnaija.xyz/wp-content/uploads/2025/07/Heads-of-State-2025-Download-NetNaija.xyz_-683x1024.webp",
    genre: ["Action", "Comedy", "Thriller"],
    year: 2025,
    rating: 7.2,
    views: 115000,
    quality: "WEBRip",
    slug: "heads-of-state-2025",
    duration: "01:50:00",
    description:
      "The UK Prime Minister and US President have a public rivalry that risks their countries' alliance. But when they become targets of a powerful enemy, they must team up to thwart a conspiracy threatening the free world.",
    cast: ["John Cena", "Idris Elba", "Priyanka Chopra Jonas", "Jack Quaid", "Carla Gugino"],
    director: "Ilya Naishuller",
    country: "United States of America",
    language: "English",
    videoUrl: "https://strtape.tech/e/vWaVdQaoGbHay7/",
    downloadUrl: "https://strtape.tech/v/vWaVdQaoGbHay7/Heads.of.State.2025.mkv",
    embedCode:
      '<iframe src="https://strtape.tech/e/vWaVdQaoGbHay7/" width="800" height="600" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
    isNew: true,
    isTrending: true,
    isFeatured: false,
  },
  {
    id: "58",
    title: "Thunderbolts*",
    poster: "https://netnaija.xyz/wp-content/uploads/2025/06/Thunderbolts-2025-Download-NetNaija.xyz_-683x1024.webp",
    backdrop: "https://netnaija.xyz/wp-content/uploads/2025/06/Thunderbolts-2025-Download-NetNaija.xyz_-683x1024.webp",
    genre: ["Action", "Adventure", "Crime", "Fantasy", "Sci-Fi"],
    year: 2025,
    rating: 7.9,
    views: 180000,
    quality: "WEBRip",
    slug: "thunderbolts-2025",
    duration: "02:05:00",
    description:
      "Seven disillusioned heroes are forced into a deadly mission that makes them confront the darkest parts of their pasts.",
    cast: ["Florence Pugh", "Sebastian Stan", "Julia Louis-Dreyfus", "David Harbour", "Wyatt Russell"],
    director: "Jake Schreier",
    country: "United States of America",
    language: "English",
    videoUrl: "https://strtape.tech/e/vQpdzXwwD0c4GLd/",
    downloadUrl: "https://strtape.tech/v/vQpdzXwwD0c4GLd/Thunderbolts.2025.mkv",
    embedCode:
      '<iframe src="https://strtape.tech/e/vQpdzXwwD0c4GLd/" width="800" height="600" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
    isNew: true,
    isTrending: true,
    isFeatured: false,
  },
  {
    id: "60",
    title: "Shaka iLembe Season 2",
    poster: "https://9jarocks.net/wp-content/uploads/2025/06/Shaka-iLembe_Poster.jpg",
    backdrop: "https://9jarocks.net/wp-content/uploads/2025/06/Shaka-iLembe_Poster.jpg",
    genre: ["Action", "Drama", "History"],
    year: 2025,
    rating: 8.1,
    views: 135000,
    quality: "WEBRip",
    slug: "shaka-ilembe-season-2",
    duration: "3 Episodes Available",
    description: "Explores the legendary rise of King Shaka Zulu, from childhood to kinghood in 1700s Africa.",
    cast: ["Nomzamo Mbatha", "Wiseman Mncube", "Lemogang Tsipa", "Mondli Makhoba"],
    director: "Teboho Mahlatsi",
    country: "South Africa",
    language: "Zulu",
    multipleDownloads: [
      {
        label: "Episode 1",
        url: "https://strtape.tech/v/wPyZwPowyOS6gp/Shaka.iLembe.S02E01.mkv",
        embedCode:
          '<iframe src="https://strtape.tech/e/wPyZwPowyOS6gp/" width="800" height="600" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
      },
      {
        label: "Episode 2",
        url: "https://strtape.tech/v/WbJQGA8rLmsbxdG/Shaka.iLembe.S02E02.mkv",
        embedCode:
          '<iframe src="https://strtape.tech/e/WbJQGA8rLmsbxdG/" width="800" height="600" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
      },
      {
        label: "Episode 3",
        url: "https://strtape.tech/v/rxzZKzqZjVIb0JZ/Shaka.iLembe.S02E03.mkv",
        embedCode:
          '<iframe src="https://strtape.tech/e/rxzZKzqZjVIb0JZ/" width="800" height="600" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
      },
    ],
    videoUrl: "https://strtape.tech/e/wPyZwPowyOS6gp/",
    downloadUrl: "https://strtape.tech/v/wPyZwPowyOS6gp/Shaka.iLembe.S02E01.mkv",
    embedCode:
      '<iframe src="https://strtape.tech/e/wPyZwPowyOS6gp/" width="800" height="600" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>',
    isNew: true,
    isTrending: true,
    isFeatured: false,
  },
]

// Helper functions to filter movies
function getFeaturedMovies() {
  return moviesData.filter((movie) => movie.isFeatured)
}

function getTrendingMovies() {
  return moviesData.filter((movie) => movie.isTrending)
}

function getNewMovies() {
  return moviesData.filter((movie) => movie.isNew)
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
  return moviesData.find((movie) => movie.id === id)
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
