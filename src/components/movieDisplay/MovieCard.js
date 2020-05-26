import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';

import { useMovies } from '../../contexts/moviesContext';
import BottomActions from './BottomActions';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '90vw',
    height: '70vh',
    background: theme.palette.warning.light,
  },
  media: {
    height: '80%',
  },
  movieInfo: {
    height: '20%',
    padding: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  movieTitle: {
    padding: theme.spacing(2),
    color: theme.palette.warning.contrastText,
  },
  blurryText: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'transparent',
    textShadow: '0 0 5px rgba(0,0,0,0.6)',
  },
  loadingSkeleton: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  skeleton: {
    backgroundColor: theme.palette.warning.main,
  },
}));

export default function MediaCard() {
  const classes = useStyles();
  const { state, getMovie } = useMovies();
  const [isDisplayMovie, setIsDisplayMovie] = useState(false);

  function handleShowDetails() {
    setIsDisplayMovie(true);
  }

  function fetchNextMovie() {
    if (isDisplayMovie) setIsDisplayMovie(false);
    getMovie();
  }

  return (
    <div>
      <Card className={classes.root}>
        {!state.movie ? (
          <div className={classes.loadingSkeleton}>
            <Skeleton variant='rect' width='90%' height='80%' className={classes.skeleton} />
            <Skeleton variant='text' width='90%' height='20%' className={classes.skeleton} />
          </div>
        ) : (
          <>
            <CardMedia className={classes.media} image={state.image} title='Movie Image' />
            <div className={classes.movieInfo}>
              {isDisplayMovie ? (
                <Typography variant='h4' align='center' className={classes.movieTitle}>
                  {state.movie}
                </Typography>
              ) : (
                <Typography variant='h3' className={classes.blurryText}>
                  ? ? ? ? ? ? ? ? ? ?
                </Typography>
              )}
            </div>
          </>
        )}
      </Card>
      <BottomActions
        detailsShown={isDisplayMovie}
        showMovieDetails={handleShowDetails}
        fetchNextMovie={fetchNextMovie}
      />
    </div>
  );
}
