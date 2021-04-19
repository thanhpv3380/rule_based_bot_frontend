import { makeStyles } from '@material-ui/styles';
const useStyle = makeStyles({
    root: {
        backgroundColor: '#eaeaea',
        height: '50%',
        width: '40%',
        borderRadius: 10,
        overflow: 'auto',
    },
    modal: {
        '& :focus': {
            outline: 'none',
        },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    gridHeaderTiltle: {
        margin: '10px 0px 30px 40px',
    },
    gridHeaderIcon: {
        margin: '10px 10px 30px 0px',
    },
    table: {
        '& .MuiTableCell-root': {
            borderLeft: '1px solid rgba(224, 224, 224, 1)',
        },
    },
    body: {
        margin: '0px 40px',
    },
    tableRow: {
        position: 'relative',
    },
    menu: {
        top: 40,
        left: 3,
    },
    paddingMenu: {
        paddingTop: 2,
        paddingBottom: 2,
    },
    tableCellInput: {
        width: 100,
        backgroundColor: '#ffff',
        borderBottom: '10px solid #eaeaea',
    },
    tableCellSelect: {
        cursor: 'pointer',
        backgroundColor: '#ffff',
        borderBottom: '10px solid #eaeaea',
    },
    tableCellIcon: {
        cursor: 'pointer',
        borderBottom: 'none',
    },
    iconDeleteButton: {
        border: '1px solid',
        borderRadius: 5,
    },
    tableRowButton: {
        backgroundColor: '#ffff',
    },
});

export default useStyle;