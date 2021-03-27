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
  tableCell: {
    position: 'relative',
  },
  formatQuoteIcon: {
    position: 'relative',
    top: 7,
    right: 10,
  },
  inputRow: {
    width: '90%',
  },
  // underline: {
  //   '&::after': {
  //     border: '0px solid #fff',
  //     content: '#fff',
  //   },
  //   '&::before': {
  //     border: '0px solid #fff',
  //     content: '#fff',
  //   },
  //   '&:hover': {
  //     border: '0px solid #fff',
  //   },
  // },
}));

export default useStyles;