import { makeStyles } from '@material-ui/styles';

const drawerWidth = 50;
export default makeStyles({
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,

  },
  drawer: {
    height: '100%',
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  boxContainer: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%',
    height: '100%'
  },
  sideBar: {
    background: 'rgb(20, 20, 20)',
    display: 'flex',
    flexDirection: 'column',
    WebkitBoxPack: 'center',
    justifyContent: 'center',
    WebkitBoxAlign: 'center',
    alignItems: 'center',
    // position: "relative",
    // padding: 2rem 1rem,
  },
  sideBarItem: {
    color: 'white',
    fontFamily: 'Helvetica, Arial',
    padding: 5,
    margin: '0px 10px',
    borderRadius: 5,
    marginBottom: 2,
    cursor: 'pointer',
  },
  content: {
    display: 'flex',
    flexGrow: 1,
  },
  layer: {
    position: 'relative',
    flexGrow: 1,
  },
});