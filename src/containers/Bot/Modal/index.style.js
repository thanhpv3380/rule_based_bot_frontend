import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  svgIcon: {
    borderRadius: '100%',
    cursor: 'pointer',
    '&:hover': {
      background: '#dadada',
    },
  },
  modal: {
    display: 'flex',
    marginTop: '10%',
    // alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    position: 'absolute',
    width: '30%',
    border: '2px solid #fff',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: 'none',
    borderRadius: 10,
  },
  mutiInput: {
    '& .MuiOutlinedInput-root': {
      borderRadius: 10,
    },
  },
  containedPrimary: {
    color: '#fff',
    backgroundColor: '#000034',
    borderRadius: 10,
    height: 38,
  },
  textPrimary: {
    color: '#000034',
    backgroundColor: '#fff',
    borderRadius: 10,
    height: 38,
  },
  buttonRoot: {
    '&:hover': {
      backgroundColor: '#000034', //#32b711
    },
  },
  buttonCancelRoot: {
    '&:hover': {
      backgroundColor: 'rgba(74, 74, 74, 0.04)',
    },
  },
}));

export default useStyles;
