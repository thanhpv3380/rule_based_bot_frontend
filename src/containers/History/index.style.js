import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {},
  dateRangePicker: {
    border: '1px solid',
    borderRadius: 6,
    padding: '0px 15px',
    display: 'flex',
    background: '#fff',
  },
  dividerDateRange: {
    display: 'flex',
    WebkitBoxAlign: 'center',
    alignItems: 'center',
    fontSize: 28,
    color: '#000',
  },
  dateStart: {
    width: 100,
    paddingRight: 4,
  },
  dateEnd: {
    width: 100,
    paddingLeft: 5,
  },
  card: {
    margin: '20px 10px',
    minHeight: 200,
    width: 'unset',
    color: 'rgba(0, 0, 0, 0.87)',
    border: 0,
    overflowWrap: 'break-word',
    fontSize: '0.875rem',
    background: 'rgb(255, 255, 255)',
    boxShadow: 'rgb(0 0 0 / 14%) 0px 1px 4px 0px',
    borderRadius: 6,
    padding: '10px 15px 15px',
  },
  cardHeader: {
    minHeight: 50,
    padding: '16px',
    marginTop: -20,
    borderRadius: 6,
    boxShadow:
      'rgb(73 145 226 / 28%) 0px 12px 20px -10px, rgb(0 0 0 / 12%) 0px 4px 20px 0px, rgb(73 145 226 / 20%) 0px 7px 8px -5px',
    color: 'rgb(255, 255, 255)',
    position: 'relative',
    width: 'auto',
    display: 'flex',
    WebkitBoxAlign: 'center',
    alignItems: 'center',
  },
  headerText: {
    margin: 0,
    lineHeight: '30px',
    flex: '1 1 0%',
    color: 'rgb(255, 255, 255)',
    padding: '0px 15px',
  },
  buttonIconHeader: {
    borderRadius: 10,
    padding: '5px 10px',
    margin: '0px 10px',
    transition: 'background-color 0.2s ease 0.1s',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: 'rgb(255, 255, 255)',
  },
  cardBody: {
    flex: '1 1 auto',
    margin: '20px 0px',
    padding: 0,
    position: 'relative',
    WebkitBoxFlex: 1,
  },
  row: {
    cursor: 'pointer',
    '&:hover': {
      background: '#eee',
    },
    border: '1px solid #eee',
    borderRadius: 6,
    marginBottom: 10,
  },
  header: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rightHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  collapse: {
    padding: '16px',
  },
}));

export default useStyles;
