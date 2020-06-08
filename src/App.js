import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';

import darkTheme from '../src/utils/theme';
import { MoviesProvider } from '../src/contexts/moviesContext';
import HistoryDrawer from '../src/pages/HistoryDrawer';
import SearchSettings from './pages/SearchSettings';
import MovieDisplay from './pages/MovieDisplay';
import Home from './pages/Home';

function AppRouter() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  function openDrawer() {
    setDrawerOpen(true);
  }

  function closeDrawer() {
    setDrawerOpen(false);
  }

  return (
    <>
      <Routes>
        <Route path='/' element={<Home openDrawer={openDrawer} />} />
        <Route
          path='movies'
          element={<MovieDisplay openDrawer={openDrawer} />}
        />
        <Route
          path='/settings'
          element={<SearchSettings openDrawer={openDrawer} />}
        />
      </Routes>
      <Drawer anchor='left' open={drawerOpen} onClose={closeDrawer}>
        <HistoryDrawer />
      </Drawer>
    </>
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
