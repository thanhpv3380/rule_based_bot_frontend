import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  textInput: {
    '& .MuiOutlinedInput-root': {
      borderRadius: 10,
      fontSize: 20,
    },
  },
}));

export default useStyles;
