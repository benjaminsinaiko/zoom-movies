// Result pages, ordered by popularity (desc)
export const pages = [...Array(10).keys()].map(x => x + 1);

// Movie release years
export const releaseYears = {
  release80s: [1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989],
  release90s: [1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
  release00s: [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009],
};

export const genres = [
  {
    id: 28,
    name: 'Action',
  },
  {
    id: 12,
    name: 'Adventure',
  },
  {
    id: 35,
    name: 'Comedy',
  },
  {
    id: 80,
    name: 'Crime',
  },
  {
    id: 18,
    name: 'Drama',
  },
  {
    id: 10751,
    name: 'Family',
  },
  {
    id: 14,
    name: 'Fantasy',
  },
  {
    id: 27,
    name: 'Horror',
  },
  {
    id: 9648,
    name: 'Mystery',
  },
  {
    id: 10749,
    name: 'Romance',
  },
  {
    id: 878,
    name: 'Science Fiction',
  },
  {
    id: 53,
    name: 'Thriller',
  },
  {
    id: 10752,
    name: 'War',
  },
];

// Always exclude (initial state)
export const excludedGenres = [
  {
    id: 16,
    name: 'Animation',
  },
  {
    id: 99,
    name: 'Documentary',
  },
  {
    id: 36,
    name: 'History',
  },
  {
    id: 10402,
    name: 'Music',
  },
  {
    id: 10770,
    name: 'TV Movie',
  },
  {
    id: 37,
    name: 'Western',
  },
];
