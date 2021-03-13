import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  content: {
    padding: 20,
  },
  margin: {
    margin: theme.spacing(0.5),
  },
  listSelect: {
    display: 'flex',
    flexDirection: 'row',
    background: theme.palette.active,
    textAlign: 'center',
    boxShadow: theme.shadows[3],
  },
  actionItem: {
    marginBottom: theme.spacing(2),
  },
  item: {
    textAlign: 'center',
  },
  contentItem: {
    padding: theme.spacing(2),
  },
}));
