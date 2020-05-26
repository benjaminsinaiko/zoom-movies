import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

import { useMovies } from '../contexts/moviesContext';
import MovieCard from '../components/movieDisplay/MovieCard';

const useStyles = makeStyles({
  root: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginTop: 20,
    marginBottom: 20,
  },
});

export default function MovieSearch() {
  const classes = useStyles();
  const { state, getMovie } = useMovies();
  console.log('history', state.history);

  return (
    <div className={classes.root}>
      {state.movie ? (
        <MovieCard />
      ) : (
        <Button variant='contained' color='primary' size='large' onClick={getMovie}>
          Let's Go!
        </Button>
      )}
    </div>
  );
}
