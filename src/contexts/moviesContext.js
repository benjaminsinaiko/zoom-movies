import React, { useReducer, createContext, useContext } from 'react';

import fetchMovieData from '../utils/fetchMovieData';

const MoviesContext = createContext();

function moviesReducer(state, action) {
  switch (action.type) {
    case 'request_movie':
      return {
        ...state,
        isLoading: true,
        movie: null,
        image: null,
        imdbURL: null,
      };
    case 'movie_success':
      const { id, movieTitle, imagePath, imdbID } = action.payload;
      const imdb = `https://www.imdb.com/title/${imdbID}`;

      return {
        ...state,
        isLoading: false,
        id: id,
        movie: movieTitle,
        image: `https://image.tmdb.org/t/p/original${imagePath}`,
        imdbURL: imdb,
        history: [
          {
            id: id,
            title: movieTitle,
            image: `https://image.tmdb.org/t/p/w500${imagePath}`,
            imdbURL: imdb,
          },
          ...state.history,
        ],
      };
    case 'update_decades':
      return {
        ...state,
        decades: action.payload,
      };

    default:
      return state;
  }
}

const initialState = {
  isLoading: false,
  id: null,
  movie: null,
  image: null,
  imdbURL: null,
  history: [],
  decades: ['release80s', 'release90s'],
};

function MoviesProvider(props) {
  const [state, dispatch] = useReducer(moviesReducer, initialState);

  // Movie Search
  async function getMovie() {
    dispatch({ type: 'request_movie' });
    const { id, movieTitle, imagePath, imdbID } = await fetchMovieData(state.decades);
    dispatch({ type: 'movie_success', payload: { id, movieTitle, imagePath, imdbID } });
  }

  // Decades updater
  async function updateDecades(decadesArray) {
    dispatch({ type: 'update_decades', payload: decadesArray });
  }

  return <MoviesContext.Provider value={{ state, getMovie, updateDecades }} {...props} />;
}

function useMovies() {
  const context = useContext(MoviesContext);
  if (context === undefined) {
    throw new Error('useMovies must be used within a Movies Provider');
  }
  return context;
}

export { MoviesProvider, useMovies };
