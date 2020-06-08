import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

import { useMovies } from '../../contexts/moviesContext';

const useStyles = makeStyles(theme => ({
  randomRoot: {
    width: '70%',
    marginTop: theme.spacing(5),
    [theme.breakpoints.down('sm')]: {
      width: '95%',
    },
  },
  label: {
    display: 'flex',
    flexDirection: 'column',
  },
  subText: {
    color: theme.palette.secondary.main,
  },
  slider: {
    [theme.breakpoints.down('sm')]: {
      '& span:nth-child(5)': {
        transform: 'translateX(0%)',
      },
      '& span:nth-child(7)': {
        left: '85% !important',
      },
    },
  },
}));

const marks = [
  {
    value: 1,
    label: 'Only Popular',
  },
  {
    value: 3,
    label: 'Mostly Popular',
  },
  {
    value: 6,
    label: 'Some Random',
  },
  {
    value: 10,
    label: 'Many Random',
  },
];
const mobileMarks = [
  {
    value: 1,
    label: 'Only Popular',
  },
  {
    value: 10,
    label: 'Many Random',
  },
];

export default function RandomLevel() {
  const classes = useStyles();
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('sm'));

  return (
    <div className={classes.randomRoot}>
      <div className={classes.label}>
        <Typography id='movie-randomness-slider' variant='h6'>
          Movie Randomness
        </Typography>
        <Typography variant='caption' className={classes.subText} gutterBottom>
          Results will contain:
        </Typography>
      </div>

      <Slider
        color='secondary'
        className={classes.slider}
        defaultValue={3}
        aria-labelledby='movie-randomness-slider'
        step={1}
        marks={isMobile ? mobileMarks : marks}
        min={1}
        max={10}
        valueLabelDisplay={isMobile ? 'on' : 'auto'}
      />
    </div>
  );
}
