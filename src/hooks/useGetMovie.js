import { useState } from 'react';

import movieDB from '../api/tmdb';
import getRandomItem from '../utils/getRandomItem';
import { releaseEighties, releaseNineties, pages } from '../api/queryConstants';

const releaseAllYears = [...releaseEighties, ...releaseNineties];

export async function getRandomMovie(releaseYears) {
  const baseURL = `https://api.themoviedb.org/3/discover/movie?`;

  const randomYear = getRandomItem(releaseYears);
  const randomPage = getRandomItem(pages);

  const { data } = await movieDB.get(
    `${baseURL}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${randomPage}&primary_release_year=${randomYear}&vote_count.gte=0.0&with_original_language=en`
  );

  const randomMovie = getRandomItem(data.results);
  return randomMovie;
}

export async function getImages(movieId) {
  const results = await movieDB.get(`https://api.themoviedb.org/3/movie/${movieId}/images`);

  return results.data;
}

export default function useGetMovie(releaseYears = releaseAllYears) {
  const [movie, setMovie] = useState();
  const [image, setImage] = useState();

  async function searchMovies() {
    const movieResult = await getRandomMovie(releaseYears);
    setMovie(movieResult);

    const imagesResult = await getImages(movieResult.id);

    // Remove images with movie poster aspect ratios
    const filteredBackdrops = imagesResult.backdrops.filter((image) => image.aspect_ratio > 1);
    setImage(getRandomItem(filteredBackdrops));
  }

  return { movie, image, searchMovies };
}
