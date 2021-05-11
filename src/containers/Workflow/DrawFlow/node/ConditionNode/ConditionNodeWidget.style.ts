import { makeStyles } from '@material-ui/styles';

const useStyle = makeStyles({
    root: {
        borderRadius: 5,
        backgroundColor: '#ffff',
    },
    header: {
        padding: 10,
        backgroundColor: '#e7fff6',
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
    },
    headerIcon: {
        position: 'relative',
        marginRight: 5,
        top: 2,
    },
    content: {
        margin: '0px 20px',

    },
    table: {
        '& .MuiTableCell-root': {
            borderLeft: '1px solid rgba(224, 224, 224, 1)',
        },
    },
    tableContainer: {
        minWidth: 280,
        // borderLeft: 'none',
        borderRadius: 5,
        marginTop: 10,
        backgroundColor: '#ffff',
        // padding: 10,
        cursor: 'pointer',
        border: '2px solid rgb(224 224 224)',
        '&:hover': {
            border: '2px solid #88beee',
            // border: '2px solid #ccc',
        }
    },
    noneTableCon: {
        minWidth: 280,
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
        borderRadius: 5,
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
    btnAdCondition: {
        padding: 5,
    },
});

export default useStyle;