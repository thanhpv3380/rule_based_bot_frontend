import { makeStyles } from '@material-ui/styles';

export default makeStyles((theme) => ({
  container: {
    marginTop: 25,
  },
  itemLeft: {
    width: 140,
    marginBottom: 20,
  },
  itemRight: {
    marginLeft: 20,
  },
  btn: {
    backgroundColor: theme.palette.blue,
    color: theme.palette.white,
    '&:hover': {
      backgroundColor: theme.palette.blue,
    },
  },
}));
