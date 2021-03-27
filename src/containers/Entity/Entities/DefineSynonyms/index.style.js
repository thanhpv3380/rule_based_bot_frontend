import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
  },
  list: {
    width: '100%',
  },
  btnAdd: {
    width: '100%',
    textAlign: 'center',
  },
  input: {
    flexGrow: 1,
    height: '100%',
  },
  listItem: {
    margin: 0,
  },
}));

export default useStyles;
