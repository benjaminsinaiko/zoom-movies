import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100vw',
    height: '100vh',
    '& h1': {
      fontSize: '8rem',
    },
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

export default function HomeSearch() {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Typography align='center' variant='h1'>
        <span className={classes.one}>Z</span>
        <span className={classes.two}>o</span>
        <span className={classes.three}>o</span>
        <span className={classes.four}>m</span>
      </Typography>
      <Typography align='center' variant='h2'>
        movies
      </Typography>
    </Container>
  );
}
