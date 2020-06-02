import React from 'react';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import FastForwardIcon from '@material-ui/icons/FastForward';

import { useMovies } from '../contexts/moviesContext';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100vw',
    height: '100vh',
    '& h1': {
      fontSize: '8rem',
    },
  },
  historyButton: {
    position: 'absolute',
    top: 3,
    left: 20,
    color: theme.palette.error.main,
  },
  settingsButton: {
    position: 'absolute',
    top: 3,
    right: 20,
    color: theme.palette.error.main,
  },
  goContainer: {
    height: 125,
  },
  searchButton: {
    color: theme.palette.warning.main,
    fontSize: 40,
    alignSelf: 'flex-end',
  },
  one: {
    color: theme.palette.primary.main,
  },
  two: {
    color: theme.palette.secondary.main,
  },
  three: {
    color: theme.palette.error.main,
  },
  four: {
    color: theme.palette.warning.main,
  },
}));

export default function Home({ openDrawer }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const { state, getMovie } = useMovies();
  const hasHistory = state.history.length > 0;

  async function searchMovies() {
    getMovie();
    navigate('/movies');
  }

  return (
    <Container className={classes.root}>
      {hasHistory && (
        <Button className={classes.historyButton} onClick={openDrawer}>
          Movie History
        </Button>
      )}

      <Button
        className={classes.settingsButton}
        startIcon={<EventAvailableIcon />}
        onClick={() => navigate('/settings')}
      >
        Release Dates
      </Button>

      <div>
        <Typography align='center' variant='h1'>
          <span className={classes.one}>Z</span>
          <span className={classes.two}>o</span>
          <span className={classes.three}>o</span>
          <span className={classes.four}>m</span>
        </Typography>
        <Typography align='center' variant='h2'>
          movies
        </Typography>
      </div>

      <div className={classes.goContainer}>
        <Button
          endIcon={<FastForwardIcon style={{ fontSize: 46 }} />}
          className={classes.searchButton}
          onClick={searchMovies}
        >
          Let's Go!
        </Button>
      </div>
    </Container>
  );
}
