import { makeStyles } from '@material-ui/styles';

const useStyle = makeStyles({
    root: {
        backgroundColor: "#fff",
        height: "80%",
        width: "60%",
        "@media (min-width: 1600px)": {
            width: "45%",
        },
        overflow: "none",
        padding: 25,
        borderRadius: 10
    },

    modal: {
        "& :focus": {
            outline: "none",
        },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10
    },
    content: {
        height: '90%',
        overflow: "auto",
        border: '1px solid #eee',
        borderRadius: 10,
        boxSizing: 'border-box'
    }
});

export default useStyle;