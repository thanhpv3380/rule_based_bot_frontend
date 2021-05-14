import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: theme.spacing(1, 1.5),
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
    marginLeft: '5px'
  },
  actionAABox: {
    marginBottom: theme.spacing(1)
  },
  divider: {
    margin: theme.spacing(1, 0)
  }
}))