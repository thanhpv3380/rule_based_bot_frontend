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
}));

export default useStyles;
