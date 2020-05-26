import React from 'react';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FastRewindIcon from '@material-ui/icons/FastRewind';

import MovieCard from '../components/movieDisplay/MovieCard';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeButton: {
    position: 'absolute',
    top: 3,
    left: 20,
    color: theme.palette.error.main,
  },
}));

export default function MovieSearch() {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <div className={classes.root}>
      <Button
        className={classes.homeButton}
        startIcon={<FastRewindIcon />}
        onClick={() => navigate('/')}
      >
        Back
      </Button>
      <MovieCard />
    </div>
  );
}
