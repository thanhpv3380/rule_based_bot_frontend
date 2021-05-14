import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles((theme) => ({
    root: {
        borderRadius: 5,
        backgroundColor: '#ffff',
        // border: "3px solid #ffff",
        // "&:hover": {
        //     border: "3px solid #22AEDA",
        // }
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
        borderRadius: 5,
    },
    grid: {
        display: "flex",
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: theme.spacing(1, 2.5),
        backgroundColor: '#dceef6',
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
    },
    iconHeader: {
        marginRight: 5,
        width: '2em',
        height: '2em'
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
        padding: 10,
        backgroundColor: '#e8f8ff',
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
    },
    headerIcon: {
        position: 'relative',
        marginRight: 5,
        top: 2,
    },
    autoComplete: {
        margin: '0px 10px',
        borderRadius: 5,
        // backgroundColor: '#ffff',
    },
    textField: {
        margin: '10px 0px 5px 0px',
    },
    forcusBody: {
        width: '100%',
        backgroundColor: '#ffff',
        margin: '10px 10px',
        borderRadius: 5,
        cursor: 'pointer',
        border: '2px solid rgb(224 224 224)',
        '&:hover': {
            border: '2px solid #88beee',
            // border: '2px solid #ccc',
        }
    },
    unforcusBody: {
        width: '100%',
        backgroundColor: '#ffff',
        margin: '10px 10px',
        padding: 10,
        borderRadius: 5,
        cursor: 'pointer',
        border: '2px solid rgb(224 224 224)',
        '&:hover': {
            border: '2px solid #88beee',
            // border: '2px solid #ccc',
        }
    },
    body: {
        margin: '10px 20px',
        padding: 10,
        borderRadius: 5,
        cursor: 'pointer',
        border: '2px solid rgb(224 224 224)',
        '&:hover': {
            // border: '2px solid #88beee',
            border: '2px solid #ccc',
        }
    },
    underline: {
        '&:after': {
            border: '2px solid #ffff'
        },

    }

}));

export default useStyle;
