import axios from 'axios';

// Create axios instance with tmdb bearer token
export default axios.create({
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_TMDB_BEARER_TOKEN}`,
  },
});
