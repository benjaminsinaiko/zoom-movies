import React from 'react';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MovieFilterIcon from '@material-ui/icons/MovieFilter';
import TheatersIcon from '@material-ui/icons/Theaters';
import Slide from '@material-ui/core/Slide';

import { useMovies } from '../contexts/moviesContext';
import goToIMDb from '../utils/goToIMDb';
import MovieCard from '../components/movieDisplay/MovieCard';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      height: '85vh',
    },
  },
  settingsButton: {
    position: 'absolute',
    top: 3,
    left: 20,
    color: theme.palette.error.main,
  },
  imdbButton: {
    position: 'absolute',
    top: 3,
    right: 20,
    color: theme.palette.error.main,
  },
}));

export default function MovieDisplay({ openDrawer }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const {
    state: { imdbURL },
  } = useMovies();

  return (
    <Slide direction='left' in mountOnEnter unmountOnExit>
      <div className={classes.root}>
        <Button
          className={classes.settingsButton}
          startIcon={<MovieFilterIcon />}
          onClick={() => navigate('/settings')}
        >
          Movie Filter
        </Button>

        {imdbURL && (
          <Button
            className={classes.imdbButton}
            startIcon={<TheatersIcon />}
            onClick={() => goToIMDb(imdbURL)}
          >
            IMDb
          </Button>
        )}

        <MovieCard openDrawer={openDrawer} />
      </div>
    </Slide>
  );
}
