import movieDB from '../api/tmdb';
import getRandomItem from '../utils/getRandomItem';
import { releaseYears, pages } from '../api/queryConstants';

async function getRandomMovie(selectedDecades, urlGenres) {
  const baseURL = `https://api.themoviedb.org/3/discover/movie?`;

  console.log('urlGenres', urlGenres);

  const randomYear = getRandomItem(selectedDecades);
  const randomPage = getRandomItem(pages);

  const { data } = await movieDB.get(
    `${baseURL}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${randomPage}&primary_release_year=${randomYear}&vote_count.gte=0.0&with_original_language=en&without_genres=${urlGenres}`
  );

  const randomMovie = getRandomItem(data.results);
  return randomMovie;
}

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

// Fetch Movie Data
export default async function fetchMovieData({ withYears, withoutGenres }) {
  const selectedDecades = withYears.reduce((array, decade) => {
    return [...array, ...releaseYears[decade]];
  }, []);
  const urlGenres = withoutGenres.join('%2C');

  const movieResult = await getRandomMovie(selectedDecades, urlGenres);
  const movieData = await getData(movieResult.id);

  // Recursively find a movie with a backdrop image
  if (!movieData) {
    return await fetchMovieData({ withYears, withoutGenres });
  } else {
    // Format movieTitle
    const releaseYear = new Date(movieResult.release_date).getFullYear();
    const movieTitle = `${movieResult.title} (${releaseYear})`;

    return {
      id: movieResult.id,
      movieTitle,
      imagePath: movieData.imagePath,
      imdbID: movieData.imdbID,
    };
  }
}
