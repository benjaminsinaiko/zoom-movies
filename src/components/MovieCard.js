import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    width: '90vw',
    height: '90vh',
  },
  imageContainer: {
    height: '80%',
  },
  media: {
    border: '1px solid red',
    height: '80%',
  },
  movieInfo: {
    border: '1px solid blue',
    justifyContent: 'center',
  },
  blurryText: {
    color: 'transparent',
    textShadow: '0 0 5px rgba(0,0,0,0.6)',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-around',
  },
});

export default function MediaCard({ movie, image, handleClick }) {
  const classes = useStyles();

  if (!image) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Card className={classes.root}>
      <CardActionArea className={classes.imageContainer}>
        <CardMedia
          className={classes.media}
          image={`https://image.tmdb.org/t/p/original${image.file_path}`}
          title='Movie Image'
        />
        <CardContent className={classes.movieInfo}>
          <Typography gutterBottom variant='h5' component='h2' className={classes.blurryText}>
            ? ? ? ? ? ? ? ? ? ?
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.buttonContainer}>
        <Button size='small' color='primary'>
          Share
        </Button>
        <Button size='small' color='primary'>
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
