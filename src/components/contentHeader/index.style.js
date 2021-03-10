import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: '#2196f3',
    height: theme.spacing(10),
  },
  root: {
    margin: '0px 10px 10px 10px',
  },
  inputItem: {
    minWidth: '20%',
    maxWidth: '170%',
    marginTop: '17px',
  },
  cardRoot: {
    width: '100%',
  },
  textFieldRoot: {
    '& .MuiInputBase-input': {
      fontSize: '1.75rem',
      fontWeight: 400,
    },
  },
  formControl: {
    '& .MuiOutlinedInput-root': {
      borderRadius: 10,
      backgroundColor: 'white',
    },
    marginTop: '5px',
    borderRadius: 10,
  },
  buttonItem: {
    width: '30%',
    fontSize: '1.4rem',
    marginTop: '5px',
    backgroundColor: '#7ebbea',
    borderRadius: 10,
  },
  underline: {
    '&::after': {
      border: '0px solid #fff',
      content: '#fff',
    },
    '&::before': {
      border: '0px solid #fff',
      content: '#fff',
    },
    '&:hover': {
      border: '0px solid #fff',
    },
  },
}));

export default useStyles;
