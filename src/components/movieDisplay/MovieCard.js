import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import BottomActions from './BottomActions';

const useStyles = makeStyles({
  root: {
    width: '90vw',
    height: '70vh',
    border: '1px solid pink',
  },
  imageContainer: {
    height: '80%',
    alignItems: 'center',
    border: '1px solid blue',
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
  blurryText: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'transparent',
    textShadow: '0 0 5px rgba(0,0,0,0.6)',
  },
  spinner: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
});

export default function MediaCard({ movie, image, handleGetMovie }) {
  const classes = useStyles();
  const [showMovieDetails, setShowMovieDetails] = useState(false);
  const releaseYear = new Date(movie?.release_date).getFullYear() || '';

  function toggleMovieDetails() {
    setShowMovieDetails(!showMovieDetails);
  }

  function nextMovie() {
    if (showMovieDetails) toggleMovieDetails();
    handleGetMovie();
  }

  return (
    <div>
      <Card className={classes.root}>
        {image ? (
          <>
            <CardMedia
              className={classes.media}
              image={`https://image.tmdb.org/t/p/original${image?.file_path}`}
              title='Movie Image'
            />
            <div className={classes.movieInfo}>
              {showMovieDetails ? (
                <Typography variant='h5'>
                  {movie.title} ({releaseYear})
                </Typography>
              ) : (
                <Typography variant='h3' className={classes.blurryText}>
                  ? ? ? ? ? ? ? ? ? ?
                </Typography>
              )}
            </div>
          </>
        ) : (
          <div className={classes.spinner}>
            <CircularProgress />
          </div>
        )}
      </Card>
      <BottomActions
        detailsShown={showMovieDetails}
        showMovieDetails={toggleMovieDetails}
        nextMovie={nextMovie}
      />
    </div>
  );
}
