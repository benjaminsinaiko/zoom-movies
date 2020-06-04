import React from 'react';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import HistoryIcon from '@material-ui/icons/History';
import MovieFilterIcon from '@material-ui/icons/MovieFilter';
import FastForwardIcon from '@material-ui/icons/FastForward';

import { useMovies } from '../contexts/moviesContext';

const useStyles = makeStyles(theme => ({
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
  goContainer: {
    height: 125,
  },
  goButton: {
    alignSelf: 'flex-end',
    fontSize: '4.5em',
    color: '#fff',
    textShadow: `0 0 5px ${theme.palette.warning.main}, 0 0 10px ${theme.palette.warning.main}, 0 0 15px ${theme.palette.warning.light}, 0 0 20px ${theme.palette.warning.light}`,
    '&  svg': {
      marginLeft: theme.spacing(4),
      transform: 'scale(1.8)',
      color: theme.palette.warning.light,
    },
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
        <Button
          className={classes.historyButton}
          onClick={openDrawer}
          startIcon={<HistoryIcon />}
        >
          Movie History
        </Button>
      )}

      <Button
        className={classes.settingsButton}
        startIcon={<MovieFilterIcon />}
        onClick={() => navigate('/settings')}
      >
        Movie Filter
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
          className={classes.goButton}
          onClick={searchMovies}
        >
          Let's Go!
        </Button>
      </div>
    </Container>
  );
}
