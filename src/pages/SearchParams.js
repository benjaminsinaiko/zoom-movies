import React from 'react';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FastRewindIcon from '@material-ui/icons/FastRewind';
import Slide from '@material-ui/core/Slide';

import { useMovies } from '../contexts/moviesContext';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    width: '100vw',
    height: '100vh',
  },
  closeButton: {
    position: 'absolute',
    top: 5,
    left: 20,
    color: theme.palette.error.main,
  },
  mainContainer: {
    maxWidth: 1200,
  },
  releaseHeader: {
    minHeight: 95,
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
  decadeButton: {
    width: '20vw',
    maxWidth: '30%',
    height: '15vh',
    '& span': {
      fontSize: '.7em',
    },
  },
  allDecadeButton: {
    width: '35%',
    height: 50,
    marginTop: theme.spacing(4),
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
      size='large'
      onClick={() => toggle(id)}
    >
      <Typography variant='h4'>
        {label}
        <span>s</span>
      </Typography>
    </Button>
  );
}

const allYears = ['release80s', 'release90s', 'release00s'];

export default function SearchParams() {
  const classes = useStyles();
  const navigate = useNavigate();
  const { state, updateWithYears } = useMovies();
  const {
    queryParams: { withYears },
  } = state;
  const isAllSelected = withYears.length === allYears.length;
  const noneSelected = withYears.length === 0;

  function isSelected(id) {
    return withYears.includes(id);
  }

  function toggleDecade(id) {
    if (isSelected(id)) {
      updateWithYears(withYears.filter(d => d !== id));
    } else {
      updateWithYears([...withYears, id]);
    }
  }

  function selectAll() {
    updateWithYears(allYears);
  }

  return (
    <Slide direction='down' in mountOnEnter unmountOnExit>
      <Container className={classes.root}>
        <Button
          className={classes.closeButton}
          startIcon={<FastRewindIcon />}
          disabled={noneSelected}
          onClick={() => navigate('/')}
        >
          Back
        </Button>

        <div className={classes.mainContainer}>
          <div className={classes.releaseHeader}>
            <Typography align='center' variant='h3' gutterBottom>
              Pick Release Dates
            </Typography>
            {noneSelected && (
              <Typography
                align='center'
                variant='subtitle2'
                className={classes.noneSelectedText}
              >
                No dates selected...
              </Typography>
            )}
          </div>
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
      </Container>
    </Slide>
  );
}
