import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  card: {
    minHeight: 200,
    color: 'rgba(0, 0, 0, 0.87)',
    border: 0,
    overflowWrap: 'break-word',
    fontSize: '0.875rem',
    background: 'rgb(255, 255, 255)',
    boxShadow: 'rgb(0 0 0 / 14%) 0px 1px 4px 0px',
    borderRadius: 6,
    padding: '10px 15px 15px',
  },
  listMessage: {
    padding: 10,
    height: 350,
    overflow: 'auto',
  },
  messageBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  messageBoxRight: {
    justifyContent: 'flex-end',
  },
  messageBoxLeft: {
    justifyContent: 'flex-start',
  },
  message: {
    padding: 8,
    maxWidth: '50%',
    borderRadius: 5,
  },
  messageRight: {
    background: theme.palette.primary.main,
    color: '#fff',
  },
  messageLeft: {
    background: '#eee',
    color: '#000',
  },
}));

export default useStyles;
