import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
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
}));

export default useStyles;
