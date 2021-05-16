import { makeStyles } from '@material-ui/styles';

export default makeStyles((theme) => ({
  dangerButton: {
    backgroundColor: theme.palette.dangerRed,
    color: theme.palette.white,
    marginTop: 25,
    '&:hover': {
      backgroundColor: theme.palette.dangerRed,
    },
  },
  dangerIcon: {
    marginRight: 3,
  },
}));
