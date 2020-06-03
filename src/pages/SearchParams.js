import React from 'react';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FastRewindIcon from '@material-ui/icons/FastRewind';
import Slide from '@material-ui/core/Slide';

import { useMovies } from '../contexts/moviesContext';
import ReleaseYears from '../components/searchSettings/ReleaseYears';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    width: '100vw',
    height: '100vh',
  },
  backToHome: {
    position: 'absolute',
    top: 5,
    left: 20,
    display: 'flex',
    alignItems: 'center',
  },
  closeButton: {
    color: theme.palette.error.main,
  },
  mainContainer: {
    maxWidth: 1200,
    height: '90vh',
    border: '1px solid red',
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

export default function SearchParams() {
  const classes = useStyles();
  const navigate = useNavigate();
  const { state } = useMovies();
  const {
    queryParams: { withYears },
  } = state;
  const noneSelected = withYears.length === 0;

  return (
    <Slide direction='down' in mountOnEnter unmountOnExit>
      <Container className={classes.root}>
        <div className={classes.backToHome}>
          <Button
            className={classes.closeButton}
            startIcon={<FastRewindIcon />}
            disabled={noneSelected}
            onClick={() => navigate('/')}
          >
            Back
          </Button>
          {noneSelected && (
            <Typography
              align='center'
              variant='subtitle1'
              className={classes.noneSelectedText}
            >
              No dates selected...
            </Typography>
          )}
        </div>

        <div className={classes.mainContainer}>
          <ReleaseYears />
        </div>
      </Container>
    </Slide>
  );
}
