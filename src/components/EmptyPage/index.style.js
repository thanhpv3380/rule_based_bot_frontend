import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    textAlign: 'center',
    fontSize: 25,
    position: 'static',
    // marginTop: '40%',
  },
  text: {
    paddingTop: '35%',
  },
  paper: {
    height: '100%',
  },
}));

export default useStyles;
