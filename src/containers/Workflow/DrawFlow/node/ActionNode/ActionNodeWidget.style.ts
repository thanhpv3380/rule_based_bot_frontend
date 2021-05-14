import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  boxContainer: {
    width: 350,
    position: 'relative'
  },
  iconMenu: {
    minWidth: 30,
    maxWidth: 350,
    display: 'inline-block',
    padding: '6px 6px 0px 6px',
    backgroundColor: 'white',
    marginBottom: 8,
    borderRadius: 5,
  },
  noneIconMenu: {
    display: 'inline-block',
    padding: '13px 0px',
    marginBottom: 8,
  },
  iconMenuItem: {
    cursor: 'pointer',
  },
  fileCopyIcon: {
    fontSize: '1.15rem',
    marginLeft: 3,
    cursor: 'pointer',
  },
  customRadius: {
    borderRadius: 5
  },
  iconHeader: {
    marginRight: 5,
    width: '2em',
    height: '2em'
  },
  iconSetting: {
    cursor: 'pointer'
  },
  grid: {
    display: "flex",
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(1, 2.5),
    backgroundColor: '#ebe0f1',
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
  },
  autoComplete: {
    borderRadius: 5,
  },
  focusBody: {
    width: '100%',
    backgroundColor: '#ffff',
    margin: '10px 10px',
    borderRadius: 5,
    cursor: 'pointer',
    border: '2px solid rgb(224 224 224)',
    '&:hover': {
      border: '2px solid #88beee',
      // border: '2px solid #ccc',
    }
  },
  unfocusBody: {
    width: '100%',
    backgroundColor: '#ffff',
    padding: 10,
    borderRadius: 5,
    cursor: 'pointer',
    border: '2px solid rgb(224 224 224)',
    '&:hover': {
      border: '2px solid #88beee',
      // border: '2px solid #ccc',
    }
  },
  textField: {
    margin: '20px 0px 20px 0px',
    paddingTop: '10px',
    paddingBottom: '10px'
  },


  formControl: {
    marginTop: theme.spacing(2),
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
  //   formControl: {
  //     '& .MuiOutlinedInput-root': {
  //       borderRadius: 10,
  //       backgroundColor: 'white',
  //     },
  //     marginTop: '4%',
  //   },
  mutiInput: {
    '& .MuiOutlinedInput-root': {
      borderRadius: 10,
    },
  },
  table: {
    '& table': {
      borderLeft: 'none',
    },
    marginTop: 15,
    borderLeftColor: '#fff',
    borderRightColor: '#fff',
  },
  textInput: {
    '& .MuiOutlinedInput-root': {
      borderRadius: 10,
      fontSize: 20,
    },
  },
  content: {
    padding: theme.spacing(2, 4, 3),
  },
}));