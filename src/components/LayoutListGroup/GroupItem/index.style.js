import { makeStyles } from '@material-ui/styles';

export default makeStyles((theme) => ({
  root: {
    paddingTop: 10,
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  popper: {
    zIndex: 1,
  },
  listItem: {
    width: '100%',
  },
  item: {
    cursor: 'pointer',
    border: theme.border.l1,
    borderRadius: theme.spacing(0.5),
    marginBottom: theme.spacing(1),
    boxShadow: theme.palette.boxShadow_l1,
  },
  accordionDetails: {
    paddingTop: 0,
  },
  link: {
    color: '#000',
    textDecoration: 'none',
  },
}));
