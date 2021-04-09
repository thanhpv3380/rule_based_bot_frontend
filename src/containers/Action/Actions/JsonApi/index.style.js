import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  btnAdd: {
    width: '100%',
    textAlign: 'center',
  },
  input: {
    flexGrow: 1,
    height: '100%',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 80,
  },
  responseBox: {
    display: 'flex',
    flexGrow: 1,
    maxHeight: '500px',
    borderRadius: '10px',
    overflow: 'auto',
    background: 'rgb(246, 246, 246)',
  },
  preBox: {
    fontFamily: 'monospace',
    fontSize: '1em',
    fontWeight: 'bold',
  },
}));

export default useStyles;
