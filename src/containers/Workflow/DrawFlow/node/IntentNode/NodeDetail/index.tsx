import * as React from "react";
import { useState } from "react";
import { DiagramEngine, PortWidget } from "@projectstorm/react-diagrams-core";
import {
  CanvasWidget,
  Action,
  ActionEvent,
  InputType,
} from "@projectstorm/react-canvas-core";
import {
  Button,
  Box,
  TextField,
  Paper,
  ListItem,
  ListItemText,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  Drawer,
  InputBase,
  Select,
  MenuItem,
  Menu,
  Typography,
  Grid,
  Divider,
  Card,
  CardContent,
  Modal,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  MoreVert as MoreVertIcon,
  Edit as Editcon,
  DeleteOutline as DeleteOutlineIcon,
  FileCopy as FileCopyIcon,
  DeviceHubSharp as DeviceHubSharpIcon,
  Close as CloseIcon,
  DeleteOutlineOutlined as DeleteOutlineOutlinedIcon,
  Add as AddIcon,
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import ItemInfoHeader from "./components/ItemInfoHeader";
import Patterns from "./components/patterns";
import Parameters from "./components/parameter";
import ActionMapping from "./components/actionMapping";

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
  gridHeaderTiltle: {
    margin: "16px 0px 30px",
  },
  gridHeaderIcon: {
    margin: "16px 50px 30px",
  },
  table: {
    "& .MuiTableCell-root": {
      borderLeft: "1px solid rgba(224, 224, 224, 1)",
    },
  },
  body: {
    margin: "0px 40px",
  },
  tableRow: {
    position: "relative",
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
    backgroundColor: "#ffff",
    borderBottom: "10px solid #eaeaea",
  },
  tableCellSelect: {
    cursor: "pointer",
    backgroundColor: "#ffff",
    borderBottom: "10px solid #eaeaea",
  },
  tableCellIcon: {
    cursor: "pointer",
    borderBottom: "none",
  },
  iconDeleteButton: {
    border: "1px solid",
    borderRadius: 5,
  },
  tableRowButton: {
    backgroundColor: "#ffff",
  },
  cardContent: { marginTop: "4%" },
  modal: {
    "& :focus": {
      outline: "none",
    },
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

interface Condition {
  openMenuConnectCondition: any;
  openMenuOperator: any;
}

const menuOperator: string[] = ["=", "!=", ">", "<"];
const menuConnectCondition: string[] = ["and", "or"];

const rows: Condition[] = [
  {
    openMenuConnectCondition: null,
    openMenuOperator: null,
  },
  {
    openMenuConnectCondition: null,
    openMenuOperator: null,
  },
];

interface IntentNodeDetail {
  open: boolean;
  setOpen: Function;
}

const IntentNodeDetail = (props: IntentNodeDetail) => {
  const classes = useStyle();
  const { open, setOpen } = props;

  const handleMouseEnterItem = (e) => {
    e.target.style.backgroundColor = "#208ef0";
  };
  const handleMouseLeaveItem = (e) => {
    e.target.style.backgroundColor = "#ffff";
  };
  return (
    <Modal
      open={open}
      className={classes.modal}
      onClose={() => {
        setOpen(false);
      }}
    >
      <Paper className={classes.root}>
        <Grid style={{ marginLeft: 40, marginRight: 40, marginTop: "3%" }}>
          <ItemInfoHeader />
          <CardContent className={classes.cardContent}>
            <Patterns />
            <br />
            <Divider />
            <br />
            <Parameters setOpen={setOpen} />
            <br />
            <Divider />
            <br />
            <ActionMapping />
          </CardContent>
        </Grid>
      </Paper>
    </Modal>
  );
};

export default IntentNodeDetail;
