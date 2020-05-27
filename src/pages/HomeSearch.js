import React from 'react';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FastForwardIcon from '@material-ui/icons/FastForward';

import { useMovies } from '../contexts/moviesContext';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    width: '100vw',
    height: '100vh',
  },
  historyButton: {
    position: 'absolute',
    top: 5,
    left: 20,
    color: theme.palette.error.main,
  },
  decadeContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: theme.spacing(6),
  },
  allDecadesContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: theme.spacing(4),
  },
  goContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: 125,
  },
  decadeButton: {
    width: '20vw',
    height: '15vh',
    '& span': {
      fontSize: '.7em',
    },
  },
  allDecadeButton: {
    width: '35%',
    height: 50,
  },
  searchButton: {
    color: theme.palette.warning.main,
    fontSize: 40,
  },
  noneSelectedText: {
    color: theme.palette.error.main,
  },
}));

function DecadeButton({ id, label, isSelected, toggle }) {
  const classes = useStyles();
  return (
    <Button
      color='primary'
      variant={isSelected ? 'contained' : 'outlined'}
      className={classes.decadeButton}
      onClick={() => toggle(id)}
    >
      <Typography variant='h4'>
        {label}
        <span>s</span>
      </Typography>
    </Button>
  );
}

const initialState = ['release80s', 'release90s', 'release00s'];

export default function HomeSearch({ openDrawer }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const { state, updateDecades, getMovie } = useMovies();
  const { decades } = state;
  const isAllSelected = decades.length === initialState.length;
  const noneSelected = decades.length === 0;
  const hasHistory = state.history.length > 0;

  function isSelected(id) {
    return decades.includes(id);
  }

  function toggleDecade(id) {
    if (isSelected(id)) {
      updateDecades(decades.filter((d) => d !== id));
    } else {
      updateDecades([...decades, id]);
    }
  }

  function selectAll() {
    updateDecades(initialState);
  }

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

      <div className={classes.mainContainer}>
        <Typography align='center' variant='h3' gutterBottom>
          Pick Release Dates
        </Typography>
        <div className={classes.decadeContainer}>
          <DecadeButton
            id='release80s'
            label='80'
            isSelected={isSelected('release80s')}
            toggle={toggleDecade}
          />
          <DecadeButton
            id='release90s'
            label='90'
            isSelected={isSelected('release90s')}
            toggle={toggleDecade}
          />
          <DecadeButton
            id='release00s'
            label='00'
            isSelected={isSelected('release00s')}
            toggle={toggleDecade}
          />
        </div>
        <div className={classes.allDecadesContainer}>
          <Button
            color='secondary'
            variant={isAllSelected ? 'outlined' : 'contained'}
            className={classes.allDecadeButton}
            onClick={selectAll}
          >
            {isAllSelected ? 'All Selected' : 'Select All'}
          </Button>
        </div>
      </div>
      <div className={classes.goContainer}>
        <Button
          endIcon={<FastForwardIcon style={{ fontSize: 46 }} />}
          className={classes.searchButton}
          disabled={noneSelected}
          onClick={searchMovies}
        >
          Let's Go!
        </Button>
        {noneSelected && (
          <Typography variant='subtitle1' className={classes.noneSelectedText}>
            No Decades Selected...
          </Typography>
        )}
      </div>
    </Container>
  );
}
