import React from 'react';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import FastRewindIcon from '@material-ui/icons/FastRewind';
import Slide from '@material-ui/core/Slide';

import ReleaseYears from '../components/searchSettings/ReleaseYears';
import RandomLevel from '../components/searchSettings/RandomLevel';
import Genres from '../components/searchSettings/Genres';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    width: '90vw',
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
    minHeight: '99vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  noneSelectedText: {
    color: theme.palette.error.main,
  },
}));

export default function QuerySettings() {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Slide direction='down' in mountOnEnter unmountOnExit>
      <Container className={classes.root}>
        <div className={classes.backToHome}>
          <Button
            className={classes.closeButton}
            startIcon={<FastRewindIcon />}
            onClick={() => navigate('/')}
          >
            Back
          </Button>
        </div>

        <div className={classes.mainContainer}>
          <RandomLevel />
          <ReleaseYears />
          <Genres />
        </div>
      </Container>
    </Slide>
  );
}
