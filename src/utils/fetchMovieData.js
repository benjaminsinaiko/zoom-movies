import movieDB from '../api/tmdb';
import getRandomItem from '../utils/getRandomItem';
import { releaseYears } from '../api/queryConstants';

// Make movie results pages array
function getPagesArray(pageNumber) {
  return [...Array(pageNumber).keys()].map(x => x + 1);
}

// Movie backdrop image and IMDb ID
async function getData(movieId) {
  const { data } = await movieDB.get(
    `https://api.themoviedb.org/3/movie/${movieId}`
  );

  if (!data.backdrop_path) {
    return null;
  } else {
    return {
      imagePath: data.backdrop_path,
      imdbID: data.imdb_id || '',
    };
  }
}

// Fetch movie with data from TMDb
async function getRandomMovie(selectedReleaseYears, urlGenres, pages) {
  const baseURL = `https://api.themoviedb.org/3/discover/movie?`;

  const randomYear = getRandomItem(selectedReleaseYears);
  const randomPage = getRandomItem(getPagesArray(pages));

  const { data } = await movieDB.get(
    `${baseURL}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${randomPage}&primary_release_year=${randomYear}&vote_count.gte=0.0&with_original_language=en&without_genres=${urlGenres}&with_original_language=en`
  );

  const randomMovie = getRandomItem(data.results);
  // Fetch movie image and imdb id
  const movieData = await getData(randomMovie.id);

  if (!movieData) {
    // Recursively find a movie with a backdrop image
    return await getRandomMovie(selectedReleaseYears, urlGenres, pages);
  } else {
    return { ...randomMovie, ...movieData };
  }
}

// Fetch and format movie data
export default async function fetchMovieData({
  withYears,
  withoutGenres,
  pages,
}) {
  // Create selected release years array
  const selectedReleaseYears = withYears.reduce((array, decade) => {
    return [...array, ...releaseYears[decade]];
  }, []);

  // Format url params for genre
  const urlGenres = withoutGenres.join('%2C');

  const movieResult = await getRandomMovie(
    selectedReleaseYears,
    urlGenres,
    pages
  );

  // Format movieTitle
  const releaseYear = new Date(movieResult.release_date).getFullYear();
  const movieTitle = `${movieResult.title} (${releaseYear})`;

  return {
    id: movieResult.id,
    movieTitle,
    imagePath: movieResult.imagePath,
    imdbID: movieResult.imdbID,
  };
}
