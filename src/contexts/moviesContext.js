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
      };
    case 'movie_success':
      const { movieTitle, imagePath } = action.payload;
      return {
        isLoading: false,
        movie: movieTitle,
        image: `https://image.tmdb.org/t/p/original${imagePath}`,
        history: [
          ...state.history,
          { movie: movieTitle, image: `https://image.tmdb.org/t/p/w500${imagePath}` },
        ],
      };
    default:
      return state;
  }
}

const initialState = {
  isLoading: false,
  movie: null,
  image: null,
  history: [],
};

function MoviesProvider(props) {
  const [state, dispatch] = useReducer(moviesReducer, initialState);

  async function getMovie() {
    dispatch({ type: 'request_movie' });

    const { movieTitle, imagePath } = await fetchMovieData();
    dispatch({ type: 'movie_success', payload: { movieTitle, imagePath } });
  }

  return <MoviesContext.Provider value={{ state, getMovie }} {...props} />;
}

function useMovies() {
  const context = useContext(MoviesContext);
  if (context === undefined) {
    throw new Error('useMovies must be used within a Movies Provider');
  }
  return context;
}

export { MoviesProvider, useMovies };
