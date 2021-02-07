import { createMuiTheme } from '@material-ui/core/styles';
import { blue, lightBlue } from '@material-ui/core/colors';

const initialCustomTheme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: lightBlue,
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
});

export default initialCustomTheme;
