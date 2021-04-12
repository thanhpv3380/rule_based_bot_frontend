import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    marginTop: "10%",
    // alignItems: 'center',
    justifyContent: "center",
  },
  paper: {
    position: "absolute",
    width: "30%",
    border: "2px solid #fff",
    // backgroundColor: theme.palette.background.paper,
    // boxShadow: theme.shadows[5],
    // padding: theme.spacing(2, 4, 3),
    outline: "none",
    borderRadius: 10,
  },
  formControl: {
    "& .MuiOutlinedInput-root": {
      borderRadius: 10,
      backgroundColor: "white",
    },
    marginTop: "4%",
  },
  mutiInput: {
    "& .MuiOutlinedInput-root": {
      borderRadius: 10,
    },
  },
  table: {
    "& table": {
      borderLeft: "none",
    },
    marginTop: 15,
    borderLeftColor: "#fff",
    borderRightColor: "#fff",
  },
  textFieldModal: {
    width: "100%",
    marginTop: "4%",
  },
  gridButtonModal: {
    marginTop: "1%",
  },
  tableRowHeader: {
    backgroundColor: "#e6e6e6",
  },
  iconTableCell: {
    marginRight: "3%",
  },
  textInput: {
    "& .MuiOutlinedInput-root": {
      borderRadius: 10,
      fontSize: 20,
    },
  },
}));

export default useStyles;
