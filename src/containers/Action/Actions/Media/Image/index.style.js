import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  uploadBtn: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  inputUpload: {
    display: 'none',
  },
  prevImage: {
    height: 150,
    boxShadow: theme.palette.boxShadow_l1,
  },
}));

export default useStyles;
