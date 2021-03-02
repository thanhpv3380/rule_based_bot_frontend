import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  margin: {
    marginBottom: '1%',
    // width: '30%',
  },
  underline: {
    '&::after': {
      border: '2px solid #000000',
    },
  },
}));

export default useStyles;
