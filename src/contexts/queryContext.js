import React, { useReducer, createContext, useContext } from 'react';

import { excludedGenres } from '../api/queryConstants';

const QueryContext = createContext();

function queryReducer(state, action) {
  switch (action.type) {
    case 'query_error':
      return {
        ...state,
        queryError: action.payload,
      };
    case 'update_with_years':
      return {
        ...state,
        withYears: action.payload,
      };
    case 'update_without_genres':
      return {
        ...state,
        withoutGenres: action.payload,
      };
    case 'update_randomness_pages':
      return {
        ...state,
        pages: action.payload,
      };

    default:
      return state;
  }
}

// Get intial state from pre-excluded genres
function getExcluded() {
  return excludedGenres.map(genre => genre.id);
}

const initialState = {
  withYears: [1985, 1999],
  withoutGenres: getExcluded(),
  pages: 4,
  queryError: null,
};

function QueryProvider(props) {
  const [queryState, dispatch] = useReducer(queryReducer, initialState);

  // Update query params - Release Years
  function updateWithYears(decadesArray) {
    dispatch({
      type: 'update_with_years',
      payload: decadesArray,
    });
  }

  // Update query params - Movie Genres
  function updateWithoutGenres(genresArray) {
    dispatch({
      type: 'update_without_genres',
      payload: genresArray,
    });
  }

  // Update query params - Randomness Pages
  function updateRandomnessPages(pageNumber) {
    dispatch({
      type: 'update_randomness_pages',
      payload: pageNumber,
    });
  }

  return (
    <QueryContext.Provider
      value={{
        queryState,
        updateWithYears,
        updateWithoutGenres,
        updateRandomnessPages,
      }}
      {...props}
    />
  );
}

function useQuery() {
  const context = useContext(QueryContext);
  if (context === undefined) {
    throw new Error('useQuery must be used within a Query Provider');
  }
  return context;
}

export { QueryProvider, useQuery };
