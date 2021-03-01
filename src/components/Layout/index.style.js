import { makeStyles } from '@material-ui/styles';

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  sideBar: {
    height: '100vh',
  },
  contentOpenSideBar: {
    marginLeft: 0,
    [theme.breakpoints.up('md')]: {
      marginLeft: 240,
    },
  },
  contentCloseSideBar: {
    marginLeft: 0,
    [theme.breakpoints.up('md')]: {
      marginLeft: 64,
    },
  },
  contentSideBar: {
    marginLeft: 0,
  },
}));
