import { makeStyles } from '@material-ui/styles';

export default makeStyles((theme) => ({
  heading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btn: {
    margin: '0 8px',
  },
  btnActive: {
    background: '#000',
    color: '#fff',
  },
  paper: {
    padding: theme.spacing(2),
    borderRadius: '10px',
    textAlign: 'center',
    borderTop: '10px solid red',
  },
  headingPaper: {
    display: 'flex',
    justifyContent: 'center',
  },
  fontBold: {
    fontWeight: '600',
  },
  headerBody: {
    display: 'flex',
    WebkitBoxAlign: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  dateRangePicker: {
    border: '1px solid',
    borderRadius: 10,
    padding: '0px 15px',
    display: 'flex',
  },
  dividerDateRange: {
    display: 'flex',
    WebkitBoxAlign: 'center',
    alignItems: 'center',
    fontSize: 28,
  },
  dateStart: {
    width: 100,
    paddingRight: 4,
  },
  dateEnd: {
    width: 100,
    paddingLeft: 5,
  },
  gridItem: {
    maxWidth: '20%',
  },
}));
