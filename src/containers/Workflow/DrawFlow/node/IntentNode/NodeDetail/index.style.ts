import { makeStyles } from '@material-ui/styles';

const useStyle = makeStyles({
    root: {
        backgroundColor: "#eaeaea",
        height: "80%",
        width: "60%",
        "@media (min-width: 1600px)": {
            width: "45%",
        },
        overflow: "auto",
        borderRadius: 10,
    },
    modal: {
        "& :focus": {
            outline: "none",
        },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    content: {
        marginLeft: 40,
        marginRight: 40,
        marginTop: '3%'
    }
});

export default useStyle;