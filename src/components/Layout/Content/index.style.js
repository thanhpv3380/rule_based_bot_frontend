import { makeStyles } from '@material-ui/styles';

export default makeStyles(() => ({
  root: {
    position: 'relative',
    flexGrow: 1,
    padding: '0 32px 32px 32px',
    marginTop: '128px',
    minHeight: 'calc(100vh - 128px)',
    boxSizing: 'border-box',
  },
  menuIcon: {
    position: 'absolute',
    top: '-56px',
    left: '18px',
  },
}));
