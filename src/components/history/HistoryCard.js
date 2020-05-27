import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 225,
    width: 300,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: 10,
    color: theme.palette.warning.contrastText,
    backgroundColor: theme.palette.warning.light,
  },
  imageContainer: {
    width: '100%',
    height: 175,
    textAlign: 'center',
  },
  image: {
    height: 175,
    width: '100%',
    objectFit: 'cover',
  },
  titleContainer: {
    width: '100%',
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export default function HistoryCard({ title, image }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.imageContainer}>
        <img src={image} alt='Movie backdrop' className={classes.image} />
      </div>
      <div className={classes.titleContainer}>
        <Typography align='center'>{title}</Typography>
      </div>
    </div>
  );
}
