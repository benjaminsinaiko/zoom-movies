import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { useMovies } from '../contexts/moviesContext';
import HistoryCard from '../components/history/HistoryCard';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    width: 400,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
  },
  homeButton: {
    position: 'absolute',
    top: 3,
    left: 20,
    color: theme.palette.error.main,
  },
}));

export default function HistoryDrawer() {
  const classes = useStyles();
  const { state } = useMovies();
  const { history } = state;

  return (
    <div className={classes.root}>
      <Typography color='secondary' variant='h5'>
        {!history ? 'Movie History' : 'No Movies Yet'}
      </Typography>
      {history &&
        history.map((movie) => (
          <HistoryCard key={movie.id} title={movie.title} image={movie.image} />
        ))}
    </div>
  );
}
