import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

import useGetMovie from '../hooks/useGetMovie';
import MovieCard from '../components/MovieCard';

const useStyles = makeStyles({
  root: {
    height: '100vh',
    display: 'flex',
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

  console.log('movie', movie);
  console.log('image', image);

  async function handleClick() {
    return await searchMovies();
  }

  return (
    <div className={classes.root}>
      {movie ? (
        <MovieCard movie={movie} image={image} handleClick={handleClick} />
      ) : (
        <Button variant='contained' color='primary' size='large' onClick={handleClick}>
          Let's Go!
        </Button>
      )}
    </div>
  );
}
