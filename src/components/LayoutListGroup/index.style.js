import { makeStyles } from '@material-ui/styles';

export default makeStyles(() => ({
  root: {
    height: '100%',
  },
  popper: {
    zIndex: 1,
  },
  children: {
    height: '100%',
    minWidth: '100%',
    backgroundColor: '#f5f5f5',
  },
}));
