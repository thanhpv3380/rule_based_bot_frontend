import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  btnAdd: {
    width: '100%',
    textAlign: 'center',
  },
  box: {
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
    border: '1px solid #ccc',
  },
  input: {
    flexGrow: 1,
    height: '100%',
  },
  alignCenterFlex: {
    display: 'flex',
    alignItems: 'center',
  },
  boxContent: {
    width: '100%',
  },
}));

export default useStyles;
