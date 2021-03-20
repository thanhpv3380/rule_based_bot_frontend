import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  textFieldItem: {
    '& .MuiInputBase-input': {
      fontSize: '1.25rem',
      paddingLeft: 20,
    },
  },
  table: {
    marginTop: 15,
    minHeight: '40%',
  },
  tableContainer: {
    minHeight: 300,
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
  margin: {
    marginBottom: '1%',
    // width: '30%',
  },
  underlineSearch: {
    '&::after': {
      border: '2px solid #000000',
    },
  },
  test: {
    backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
  },
  testContent: {
    // '[contenteditable]': {
    //   outline: '0px solid transparent',
    // },
    '[contenteditable="true"]: focus': {
      border: 'none',
      outline: 'none',
    },
    '& .content-editable:focus': {
      background: '#fcf8e1',
      outline: 'none',
    },
    '& .content-editable:hover': {
      background: '#f7f7f7',
    },
  },
}));

export default useStyles;
