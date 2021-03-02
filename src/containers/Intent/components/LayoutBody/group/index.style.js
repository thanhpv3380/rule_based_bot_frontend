import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    // '&:hover': {
    //   background: '#e6e6e6',
    // },
    width: '100%',
    margin: '20px 0px 10px 0px',
    border: '1px solid rgba(0, 0, 0, 0.23)',
    borderRadius: 5,
    '&:hover': {
      background: '#f3f3f3',
    },
  },
  button: {
    '&:hover': {
      background: '#f5f5f5',
    },
  },
  textSearch: {
    '& .MuiOutlinedInput-root': {
      borderRadius: 10,
    },
    width: '100%',
  },
  linkRoot: {
    color: theme.palette.black, // '#000000',
  },
  groupRoot: {
    height: theme.spacing(6),
    width: '90%',
    borderRadius: 10,
    margin: '10px 10px 10px 20px',
  },
  groupItem: {
    // marginTop: 5,
  },
  muiMenuPaper: {
    borderRadius: 10,
  },
  muiMenu: {
    top: 40,
    left: 70,
  },
}));

export default useStyles;
