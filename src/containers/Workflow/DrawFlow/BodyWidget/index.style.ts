import { makeStyles } from '@material-ui/styles';

const drawerWidth = 50;
export default makeStyles(() => ({
  container: {
    position: 'relative',
  },
  sideBar: {
    position: 'fixed',
    top: '50%',
    transform: 'translateY(-50%)',
    left: 0,
    zIndex: 99
  },
  sideBarItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Helvetica, Arial',
    padding: 5,
    margin: '5px 10px',
    borderRadius: '50%',
    width: '30px',
    height: '30px',
    marginBottom: 2,
    cursor: 'pointer',
    background: '#fff',
    boxShadow: '0 10px 6px -6px #777'
  },
  siderBarIcon: {
    width: '2em', height: '2em'
  },
  siderBarIconSave: {
    color: '#7b7b7b',
  }
}));