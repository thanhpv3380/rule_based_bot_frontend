import { makeStyles } from '@material-ui/styles';

export default makeStyles((theme) => ({
  heading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btn: {
    margin: '0 8px',
  },
  btnActive: {
    background: '#000',
    color: '#fff',
  },
  paper: {
    padding: theme.spacing(2),
    borderRadius: '10px',
    textAlign: 'center',
    borderTop: '10px solid red',
  },
  headingPaper: {
    display: 'flex',
    justifyContent: 'center',
  },
  fontBold: {
    fontWeight: '600',
  },
}));