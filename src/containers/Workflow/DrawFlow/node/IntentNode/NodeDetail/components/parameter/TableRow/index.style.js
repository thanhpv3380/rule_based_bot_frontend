import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginTop: theme.spacing(2),
  },
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
    backgroundColor: "#fff",
    // boxShadow: theme.shadows[5],
    padding: "16px 32px 24px",
    outline: "none",
    borderRadius: 10,
  },
  //   formControl: {
  //     '& .MuiOutlinedInput-root': {
  //       borderRadius: 10,
  //       backgroundColor: 'white',
  //     },
  //     marginTop: '4%',
  //   },
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
  gridButtonModal: {
    marginTop: "1%",
  },
  tableRowHeader: {
    backgroundColor: "#e6e6e6",
  },
  iconTableCell: {
    marginLeft: 10,
  },
  tableCell: {
    width: "30%",
  },
  textInput: {
    "& .MuiOutlinedInput-root": {
      borderRadius: 10,
      fontSize: 20,
    },
  },
  borderRadius: {
    borderRadius: 10,
  },
}));

export default useStyles;
