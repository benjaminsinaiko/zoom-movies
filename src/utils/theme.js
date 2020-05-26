import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

let darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#ff48c4',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: '#2bd1fc',
    },
    error: {
      main: '#ff3f3f',
    },
    warning: {
      main: '#f3ea5f',
    },
  },
  typography: {
    fontFamily: [
      'Audiowide',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

darkTheme = responsiveFontSizes(darkTheme);
export default darkTheme;
