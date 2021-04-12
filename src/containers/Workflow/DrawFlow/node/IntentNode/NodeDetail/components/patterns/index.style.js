import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  textFieldItem: {
    "& .MuiInputBase-input": {
      fontSize: "1.25rem",
      paddingLeft: 20,
    },
  },
  table: {
    marginTop: 15,
    minHeight: "40%",
  },
  tableContainer: {
    minHeight: 134,
  },
  tableCell: {
    position: "relative",
  },
  formatQuoteIcon: {
    position: "relative",
    top: 7,
    right: 10,
  },
  inputRow: {
    width: "90%",
  },
}));

export default useStyles;
