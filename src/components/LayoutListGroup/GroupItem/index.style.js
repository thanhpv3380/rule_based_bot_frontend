import { makeStyles } from '@material-ui/styles';

export default makeStyles((theme) => ({
  root: {
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
    padding: '0 10px',
    borderRadius: 10,
    margin: '10px 10px 10px 20px',
    cursor: 'pointer',
  },
  muiMenuPaper: {
    borderRadius: 10,
  },
  muiMenu: {
    top: 40,
    left: 70,
  },
  link: {
    margin: 10,
  },
  listRoot: {
    border: '1px solid rgb(0 0 0 / 23%)',
    borderRadius: 5,
    margin: '10px 0px 0px 0px',
    background: theme.palette.greyWhile,
  },
  listRootSystem: {
    border: '1px solid rgb(0 0 0 / 23%)',
    borderRadius: 5,
    margin: '10px 0px 0px 0px',
    background: '#1095ff',
  },
  listItem: {
    border: '1px solid rgba(0, 0, 0, 0.23)',
    borderRadius: 5,
    width: '100%',
    margin: '20px 0px 10px 0px',
    height: 60,
    background: theme.palette.greyWhile,
  },
  listItemNameGroup: {
    cursor: 'pointer',
  },
  divider: {
    margin: '8px 16px 0px 16px',
  },
  itemSelected: {
    background: theme.palette.active,
  },
}));
