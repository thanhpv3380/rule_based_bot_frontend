import { makeStyles } from '@material-ui/styles';

export default makeStyles((theme) => ({
  root: {
    zIndex: theme.zIndex.drawer + 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: '20px',
    textTransform: 'uppercase',
    flexGrow: 1,
  },
  brandName: {
    display: 'flex',
    alignItems: 'center',
  },
  account: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: '20px',
    marginRight: '76px',
  },
  avatarWrapper: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: '16px',
    borderRadius: '100%',
    backgroundColor: theme.palette.primary.main,
    zIndex: theme.zIndex.drawer + 2,
  },
  avatar: ({ bgColor }) => ({
    backgroundColor: bgColor,
    width: '60px',
    height: '60px',
  }),
  language: {
    color: '#ffffff',
  },
}));
