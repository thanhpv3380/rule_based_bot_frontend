import { makeStyles } from '@material-ui/styles';

const useStyle = makeStyles({
    root: {
        borderRadius: 10,
        backgroundColor: '#ffff',
    },
    header: {
        paddingTop: 10,
    },
    headerIcon: {
        position: 'relative',
        marginRight: 5,
        top: 2,
    },
    table: {
        '& .MuiTableCell-root': {
            borderLeft: '1px solid rgba(224, 224, 224, 1)',
        },
    },
    tableContainer: {
        width: 280,
        borderLeft: 'none',
        borderRadius: 10,
        paddingBottom: 2,
    },
    tableCell: {
        borderBottom: 'none',
    },
    paddingMenu: {
        paddingTop: 2,
        paddingBottom: 2,
    },
    portout: {
        position: 'relative',
        left: 135,
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
});

export default useStyle;