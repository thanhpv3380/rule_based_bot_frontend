import { createMuiTheme } from '@material-ui/core/styles';
import { blue, lightBlue, grey } from '@material-ui/core/colors';

const initialCustomTheme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: lightBlue,
    black: grey[900],
    greyWhile: '#f5f5f5',
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
