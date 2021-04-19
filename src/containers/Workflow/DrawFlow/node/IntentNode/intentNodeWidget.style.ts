import { makeStyles } from '@material-ui/styles';

const useStyle = makeStyles({
    root: {
        borderRadius: 10,
        backgroundColor: '#ffff',
    },
    container: {
        width: 280,
        position: 'relative'
    },
    iconMenu: {
        minWidth: 30,
        maxWidth: 350,
        display: 'inline-block',
        padding: '6px 6px 0px 6px',
        backgroundColor: 'white',
        marginBottom: 8,
        borderRadius: 10,
    },
    noneIconMenu: {
        display: 'inline-block',
        padding: '13px 0px',
        marginBottom: 8,
    },
    iconMenuItem: {
        cursor: 'pointer',
    },
    fileCopyIcon: {
        fontSize: '1.15rem',
        marginLeft: 3,
        cursor: 'pointer',
    },
    header: {
        paddingTop: 10,
    },
    headerIcon: {
        position: 'relative',
        marginRight: 5,
        top: 2,
    },
    autoComplete: {
        margin: '0px 20px',
    },
    textField: {
        margin: '10px 0px 5px 0px',
    }
});

export default useStyle;
