import { makeStyles } from '@material-ui/styles';

export default makeStyles((theme) => ({
  root: {
    paddingTop: 10,
    width: '100%',
    '&:hover': {
      moreIcon: {
        display: 'block',
      },
    },
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  popper: {
    zIndex: 1,
  },
  moreIcon: {
    display: 'block',
  },
  listItem: {
    width: '100%',
  },
  item: {
    border: '1px solid #ccc',
  },
  accordionDetails: {
    paddingTop: 0,
  },
  link: {
    color: '#000',
    textDecoration: 'none',
  },
}));
