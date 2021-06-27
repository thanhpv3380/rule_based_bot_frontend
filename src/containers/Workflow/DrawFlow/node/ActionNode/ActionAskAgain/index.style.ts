import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    width: '100%',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxSizing: 'border-box',
    padding: theme.spacing(1.5, 1.5),
    cursor: "pointer"
  },
  formControl: {
    marginTop: theme.spacing(1),
  },
  textInput: {
    '& .MuiOutlinedInput-root': {
      borderRadius: 5,
      fontSize: 20,
    },
  },
  mutiInput: {
    '& .MuiOutlinedInput-root': {
      borderRadius: 5,
    },
  },
  buttonShow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

  },
  textIcon: {
    marginLeft: '5px',
    fontWeight: 'bold',
  },
  actionAABox: {
    marginBottom: theme.spacing(1)
  },
  divider: {
    margin: theme.spacing(1, 0)
  },
  title: {
    color: '#ccc'
  }
}))