import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { useMovies } from '../../contexts/moviesContext';
import { releaseYears } from '../../api/queryConstants';

const useStyles = makeStyles(theme => ({
  yearsRoot: {
    width: '100%',
  },
  yearsHeader: {
    minHeight: 95,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    border: '1px solid green',
  },
  decadeContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: theme.spacing(6),
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
    width: 170,
    height: 50,
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

export default function ReleaseYears() {
  const classes = useStyles();
  const { state, updateWithYears } = useMovies();
  const {
    queryParams: { withYears },
  } = state;
  const allYears = Object.keys(releaseYears);
  const isAllSelected = withYears.length === allYears.length;

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
    <div className={classes.yearsRoot}>
      <div className={classes.yearsHeader}>
        <Typography variant='h3'>Release Dates</Typography>
        <Button
          color='secondary'
          variant={isAllSelected ? 'outlined' : 'contained'}
          className={classes.allDecadeButton}
          onClick={selectAll}
        >
          {isAllSelected ? 'All Selected' : 'Select All'}
        </Button>
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
    </div>
  );
}
