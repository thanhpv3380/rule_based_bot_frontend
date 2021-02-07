import { makeStyles } from '@material-ui/styles';

const sidebarWidth = 240;

export default makeStyles((theme) => ({
  drawer: {
    width: sidebarWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxShadow: theme.palette.boxShadow,
  },
  drawerMobile: {
    width: sidebarWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: sidebarWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflow: 'visible',
    width: '64px',
  },
  header: {
    height: '48px',
  },
  nested: {
    paddingLeft: '32px',
  },
  hide: {
    display: 'none',
  },
  menuButton: {},
  menuItem: {
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.12)',
      '& $menuIcon, & $menuTitle': {
        color: 'rgba(0, 0, 0, 0.87)',
      },
    },
  },
  menuIcon: {
    minWidth: '24px',
    height: '30px',
    fontSize: '24px',
    lineHeight: '30px',
    alignItems: 'center',
    verticalAlign: 'middle',
    color: '#000',
  },
  menuTitle: {
    paddingLeft: '10px',
    margin: '0px',
    transition: 'all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1) 0s',
    color: '#000',
  },
  primary: {
    color: 'rgba(0, 0, 0, 0.87)',
  },
  backgroundPrimary: {
    backgroundColor: 'rgba(0, 0, 0, 0.12)',
  },
  menuSubmenu: {
    position: 'relative',
    '&:hover': {
      '& $placementRightTop': {
        display: 'block',
      },
    },
  },
  placementRightTop: {
    backgroundColor: 'transparent',
    position: 'absolute',
    display: 'none',
    top: '0px',
    right: `${-sidebarWidth - 8}px`,
    width: `${sidebarWidth}px`,
    paddingLeft: '8px',
  },
  subMenu: {
    padding: '4px 0px',
    borderRadius: '4px',
    backgroundColor: '#ffffff',
    boxShadow: theme.palette.boxShadow,
  },
  link: {
    textDecoration: 'none',
  },
}));
