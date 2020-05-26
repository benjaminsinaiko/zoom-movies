import React from 'react';

import { MoviesProvider } from '../src/contexts/moviesContext';
import MovieSearch from '../src/pages/MovieSearch';

function App() {
  return (
    <MoviesProvider>
      <div className='App'>
        <MovieSearch />
      </div>
    </MoviesProvider>
  );
}

export default App;
