import { makeStyles } from '@material-ui/styles';

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 520,
    padding: 20,
  },
  title: {
    fontSize: 28,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  buttons: {
    width: '100%',
    margin: theme.spacing(3, 0, 2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
}));
