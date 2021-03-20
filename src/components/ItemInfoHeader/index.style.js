import { makeStyles } from '@material-ui/styles';

export default makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  textField: {
    background: '#fff',
    borderRadius: theme.spacing(0.5),
    border: 0,
    color: 'white',
    boxShadow: theme.palette.boxShadow_l1,
    flexGrow: 1,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    background: '#fff',
    padding: theme.spacing(0.5),
    borderRadius: theme.spacing(0.5),
    boxShadow: theme.palette.boxShadow_l1,
    border: 0,
  },
  select: {},
}));
