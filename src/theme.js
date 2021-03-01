import { createMuiTheme } from '@material-ui/core/styles';
import { blue, lightBlue } from '@material-ui/core/colors';

const initialCustomTheme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: lightBlue,
    boxShadow:
      'rgba(0, 0, 0, 0.42) 0px 10px 30px -12px, rgba(0, 0, 0, 0.12) 0px 4px 25px 0px, rgba(0, 0, 0, 0.2) 0px 8px 10px -5px',
  },
  typography: {
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  },
  overrides: {
    MuiDrawer: {
      paper: {
        position: 'inherit',
        overflowY: 'inherit',
      },
    },
  },
  zIndex: {
    drawer: 10,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

export default initialCustomTheme;
