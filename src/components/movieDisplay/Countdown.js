import React from 'react';
import { makeStyles, fade } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'absolute',
    width: '100%',
    height: '95%',
    display: 'flex',
    justifyContent: 'center',
    zIndex: 10,
  },
  countdownRoot: {
    width: '100%',
    height: '90%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  count: {
    fontSize: '10rem',
    width: '25vw',
    height: '25vw',
    backgroundColor: fade(theme.palette.primary.main, 0.8),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      width: '45vw',
      height: '45vw',
    },
  },
}));

export default function Countdown({ count }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.countdownRoot}>
        <Typography variant='h1' className={classes.count}>
          {count}
        </Typography>
      </div>
    </div>
  );
}
