import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import HistoryIcon from '@material-ui/icons/History';
import VisibilityIcon from '@material-ui/icons/Visibility';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import Skeleton from '@material-ui/lab/Skeleton';

import { useMovies } from '../../contexts/moviesContext';
import useCountdown from '../../hooks/useCountdown';
import Countdown from './Countdown';

const useStyles = makeStyles(theme => ({
  movieContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  sideButtons: {
    height: '95vh',
    minWidth: '5vw',
    padding: 0,
  },
  cardContainer: {
    position: 'relative',
    width: '90vw',
    maxWidth: 1900,
    height: '95vh',
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
  bottomButtonContainer: {
    width: '100%',
    maxWidth: 1000,
    textAlign: 'center',
  },
  showMovieButton: {
    alignSelf: 'flex-end',
    width: '100%',
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

export default function MediaCard({ openDrawer }) {
  const classes = useStyles();
  const { state, getMovie } = useMovies();
  const [isDisplayMovie, setIsDisplayMovie] = useState(false);
  const [count, isRunning, startCoundown] = useCountdown();

  function handleShowDetails() {
    setIsDisplayMovie(true);
  }

  function handleNextMovie() {
    startCoundown();
  }

  useEffect(() => {
    if (count === 0) {
      getMovie();
      setIsDisplayMovie(false);
    }
  }, [count, getMovie]);

  return (
    <div className={classes.movieContainer}>
      <Button
        variant='contained'
        color='secondary'
        className={classes.sideButtons}
        onClick={openDrawer}
      >
        <HistoryIcon style={{ fontSize: 40 }} />
      </Button>

      {isRunning && count > 0 && <Countdown count={count} />}

      <Card className={classes.cardContainer}>
        {!state.movie ? (
          <div className={classes.loadingSkeleton}>
            <Skeleton
              variant='rect'
              width='90%'
              height='80%'
              className={classes.skeleton}
            />
            <Skeleton
              variant='text'
              width='90%'
              height='20%'
              className={classes.skeleton}
            />
          </div>
        ) : (
          <>
            <CardMedia
              className={classes.media}
              image={state.image}
              title='Movie Image'
            />
            <div className={classes.movieInfo}>
              {isDisplayMovie ? (
                <Typography
                  variant='h4'
                  align='center'
                  className={classes.movieTitle}
                >
                  {state.movie}
                </Typography>
              ) : (
                <Typography
                  variant='h3'
                  className={classes.blurryText}
                  onClick={handleShowDetails}
                >
                  ? ? ? ? ? ? ? ? ? ?
                </Typography>
              )}
            </div>
          </>
        )}
      </Card>

      <Button
        variant='contained'
        color='primary'
        className={classes.sideButtons}
        onClick={isDisplayMovie ? handleNextMovie : handleShowDetails}
      >
        {isDisplayMovie ? (
          <SkipNextIcon style={{ fontSize: 40 }} />
        ) : (
          <VisibilityIcon style={{ fontSize: 40 }} />
        )}
      </Button>
    </div>
  );
}
