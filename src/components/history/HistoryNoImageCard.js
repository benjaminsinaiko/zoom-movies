import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: 75,
    width: 300,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    color: theme.palette.warning.contrastText,
    backgroundColor: theme.palette.warning.light,
  },
}));

export default function HistoryCard({ title }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography align='center'>{title}</Typography>
    </div>
  );
}
