import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  buttonContainer: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },

  changeMovieContainer: {
    height: '15vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  changeMovieButton: {
    height: '100%',
    width: '30%',
    maxWidth: 250,
  },
});

export default function MediaCard({ detailsShown, showMovieDetails, nextMovie }) {
  const classes = useStyles();

  return (
    <div className={classes.buttonContainer}>
      <div>
        <Button
          color='primary'
          size='large'
          onClick={showMovieDetails}
          className={classes.button}
          disabled={detailsShown}
        >
          Show Movie
        </Button>
      </div>
      <div className={classes.changeMovieContainer}>
        <Button variant='contained' size='small' className={classes.changeMovieButton}>
          Previous
        </Button>

        <Button
          variant='contained'
          size='small'
          color='primary'
          className={classes.changeMovieButton}
          onClick={nextMovie}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
