import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    // width: '30%',
    '& > *': {
      margin: theme.spacing(1),
      height: theme.spacing(10),
    },
    cursor: 'pointer',
    '&:hover': {
      background: '#e6e6e6',
    },
    marginTop: '2%',
  },
  rounded: {
    height: 60,
    width: 60,
  },
  gridBody: {
    fontStyle: 'italic',
  },
}));

export default useStyles;
