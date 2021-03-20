import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '0 100px',
    [theme.breakpoints.down('lg')]: {
      padding: '0 50px',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '0 10px',
    },
  },
}));

export default useStyles;
