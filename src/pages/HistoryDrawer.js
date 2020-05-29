import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { useMovies } from '../contexts/moviesContext';
import HistoryCard from '../components/history/HistoryCard';
import HistoryNoImageCard from '../components/history/HistoryNoImageCard';

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
  const hasHistory = state.history.length > 0;

  return (
    <div className={classes.root}>
      <Typography color='secondary' variant='h5'>
        {hasHistory ? 'Movie History' : 'No Movies Yet'}
      </Typography>
      {history &&
        history.map((movie, i) => {
          return i < 10 ? (
            <HistoryCard key={movie.id} title={movie.title} image={movie.image} />
          ) : (
            <HistoryNoImageCard key={movie.id} title={movie.title} />
          );
        })}
    </div>
  );
}
