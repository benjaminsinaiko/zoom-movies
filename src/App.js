import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { MoviesProvider } from '../src/contexts/moviesContext';
import MovieSearch from '../src/pages/MovieSearch';

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

function AppRouter() {
  return (
    <Routes>
      <Route path='/' element={<MovieSearch />} />
    </Routes>
  );
}

export default function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <MoviesProvider>
        <Router>
          <AppRouter />
        </Router>
      </MoviesProvider>
    </ThemeProvider>
  );
}
