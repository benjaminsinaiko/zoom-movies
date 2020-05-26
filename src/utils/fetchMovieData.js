import movieDB from '../api/tmdb';
import getRandomItem from '../utils/getRandomItem';
import { releaseYears, pages } from '../api/queryConstants';

const releaseAllYears = [
  ...releaseYears.release80s,
  ...releaseYears.release90s,
  ...releaseYears.release00s,
];

async function getRandomMovie(releaseYears) {
  const baseURL = `https://api.themoviedb.org/3/discover/movie?`;

  const randomYear = getRandomItem(releaseYears);
  const randomPage = getRandomItem(pages);

  const { data } = await movieDB.get(
    `${baseURL}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${randomPage}&primary_release_year=${randomYear}&vote_count.gte=0.0&with_original_language=en`
  );

  const randomMovie = getRandomItem(data.results);
  return randomMovie;
}

async function getImage(movieId) {
  const { data } = await movieDB.get(`https://api.themoviedb.org/3/movie/${movieId}/images`);

  if (data.backdrops.length <= 0) {
    return null;
  } else {
    const aspectFiltered = data.backdrops.filter((image) => image.aspect_ratio > 1.25);
    return getRandomItem(aspectFiltered);
  }
}

export default async function fetchMovieData(releaseYears = releaseAllYears) {
  const movieResult = await getRandomMovie(releaseYears);
  const imageResult = await getImage(movieResult.id);

  // Recursively find a film with a backdrop image
  if (!imageResult) {
    return await fetchMovieData(releaseYears);
  } else {
    // Format movieTitle
    const releaseYear = new Date(movieResult.release_date).getFullYear();
    const movieTitle = `${movieResult.title} (${releaseYear})`;

    return {
      movieTitle,
      imagePath: imageResult.file_path,
    };
  }
}
