import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

import useGetMovie from '../hooks/useGetMovie';
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
  const { movie, image, searchMovies } = useGetMovie();

  async function handleGetMovie() {
    return await searchMovies();
  }

  return (
    <div className={classes.root}>
      {movie ? (
        <MovieCard movie={movie} image={image} handleGetMovie={handleGetMovie} />
      ) : (
        <Button variant='contained' color='primary' size='large' onClick={handleGetMovie}>
          Let's Go!
        </Button>
      )}
    </div>
  );
}
