import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import darkTheme from '../src/utils/theme';
import { MoviesProvider } from '../src/contexts/moviesContext';
import HomeSearch from '../src/pages/HomeSearch';
import MovieSearch from '../src/pages/MovieSearch';

function AppRouter() {
  return (
    <Routes>
      <Route path='/' element={<HomeSearch />} />
      <Route path='/movies' element={<MovieSearch />} />
    </Routes>
  );
}

export default function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <MoviesProvider>
        <Router>
          <AppRouter />
        </Router>
      </MoviesProvider>
    </ThemeProvider>
  );
}
