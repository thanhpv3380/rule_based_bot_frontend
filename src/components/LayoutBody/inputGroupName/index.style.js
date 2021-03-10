import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    border: '1px solid rgba(0, 0, 0, 0.23)',
    borderRadius: 5,
    width: '100%',
    margin: '20px 10px 10px 0px',
    height: 60,
    background: theme.palette.greyWhile,
  },
  container: {
    marginTop: '0.5%',
  },
  inputItem: {
    marginTop: '3%',
  },
}));

export default useStyles;
