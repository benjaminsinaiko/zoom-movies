import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { useMovies } from '../../contexts/moviesContext';
import { genres, excludedGenres } from '../../api/queryConstants';

const useStyles = makeStyles(theme => ({
  yearsRoot: {
    width: '100%',
    minHeight: '45vh',
    paddingLeft: '5%',
    paddingRight: '5%',
    border: '1px solid yellow',
  },
  yearsHeader: {
    minHeight: 95,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectAllButton: {
    width: 170,
    maxWidth: '30%',
    height: 50,
  },
  genreContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  genreButton: {
    margin: theme.spacing(2),
  },
}));

function GenreButton({ genre, isExcluded, toggle }) {
  const classes = useStyles();
  return (
    <Button
      color='primary'
      variant={isExcluded ? 'outlined' : 'contained'}
      className={classes.genreButton}
      size='large'
      onClick={() => toggle(genre.id)}
    >
      {genre.name}
    </Button>
  );
}

export default function Genres() {
  const classes = useStyles();
  const { state, updateWithoutGenres } = useMovies();
  const {
    queryParams: { withoutGenres },
  } = state;
  const isAllIncluded = withoutGenres.length === excludedGenres.length;

  function isExcluded(id) {
    return withoutGenres.includes(id);
  }

  function toggleGenre(id) {
    if (isExcluded(id)) {
      updateWithoutGenres(withoutGenres.filter(genreId => genreId !== id));
    } else {
      updateWithoutGenres([...withoutGenres, id]);
    }
  }

  function selectAll() {
    updateWithoutGenres(excludedGenres);
  }

  return (
    <div className={classes.yearsRoot}>
      <div className={classes.yearsHeader}>
        <Typography variant='h3'>Movie Genres</Typography>
        <Button
          color='secondary'
          variant={isAllIncluded ? null : 'outlined'}
          className={classes.selectAllButton}
          disabled={isAllIncluded}
          onClick={selectAll}
        >
          {isAllIncluded ? 'All Selected' : 'Select All'}
        </Button>
      </div>

      <div className={classes.genreContainer}>
        {genres &&
          genres.map(genre => (
            <GenreButton
              key={genre.id}
              genre={genre}
              isExcluded={isExcluded(genre.id)}
              toggle={toggleGenre}
            />
          ))}
      </div>
    </div>
  );
}
