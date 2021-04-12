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

const useStyle = makeStyles({
  root: {
    backgroundColor: "#eaeaea",
    height: "50%",
    width: "40%",
    borderRadius: 10,
    overflow: "auto",
  },
  modal: {
    "& :focus": {
      outline: "none",
    },
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  gridHeaderTiltle: {
    margin: "10px 0px 30px 40px",
  },
  gridHeaderIcon: {
    margin: "10px 10px 30px 0px",
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
});

interface Condition {
  openMenuConnectCondition: any;
  openMenuOperator: any;
}

const menuOperator: string[] = ["=", "!=", ">", "<", "start with"];
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

interface ConditionNodeDetail {
  open: boolean;
  conditions: Condition[];
  handleOpenMenuOperator: Function;
  handleCloseMenuOperator: Function;
  handleCloseMenuConnectCondition: Function;
  handleOpenMenuConnectCondition: Function;
  setOpen: Function;
}

const ConditionNodeDetail = (props: ConditionNodeDetail) => {
  const classes = useStyle();
  const {
    open,
    conditions,
    handleOpenMenuOperator,
    handleCloseMenuOperator,
    handleCloseMenuConnectCondition,
    handleOpenMenuConnectCondition,
    setOpen,
  } = props;

  const handleMouseEnterItem = (e) => {
    e.target.style.backgroundColor = "#208ef0";
  };
  const handleMouseLeaveItem = (e) => {
    e.target.style.backgroundColor = "#ffff";
  };
  return (
    <Modal
      className={classes.modal}
      open={open}
      onClose={() => {
        setOpen(false);
      }}
    >
      <Box className={classes.root}>
        <Grid container justify="space-between">
          <Grid item className={classes.gridHeaderTiltle}>
            <Typography variant="h6">Condition</Typography>
          </Grid>
          <Grid item className={classes.gridHeaderIcon}>
            <CloseIcon
              onClick={() => {
                setOpen(false);
              }}
            />
          </Grid>
        </Grid>
        <Box className={classes.body}>
          <TableContainer>
            <Table size="small" className={classes.table}>
              <TableBody>
                {conditions.map((condition, index) => (
                  <TableRow className={classes.tableRow}>
                    <TableCell
                      component="th"
                      scope="row"
                      className={classes.tableCellInput}
                    >
                      <Autocomplete
                        size="small"
                        options={[]}
                        getOptionSelected={(option, value) =>
                          option.id === value.id
                        }
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => (
                          <InputBase {...params} placeholder="Tên tham số" />
                        )}
                      />
                    </TableCell>
                    <TableCell
                      align="left"
                      className={classes.tableCellSelect}
                      onClick={(e) => handleOpenMenuOperator(e, index)}
                    >
                      {">"}
                      <Menu
                        elevation={0}
                        className={classes.menu}
                        anchorEl={condition.openMenuOperator}
                        open={Boolean(condition.openMenuOperator)}
                        onClose={(e) => handleCloseMenuOperator(e, index)}
                      >
                        {menuOperator.map((el) => (
                          <MenuItem
                            onMouseEnter={handleMouseEnterItem}
                            onMouseLeave={handleMouseLeaveItem}
                            onClick={(e) => handleCloseMenuOperator(e, index)}
                            value={el}
                          >
                            {el}
                          </MenuItem>
                        ))}
                      </Menu>
                    </TableCell>
                    <TableCell align="left" className={classes.tableCellInput}>
                      <InputBase placeholder="Giá trị" />
                    </TableCell>
                    <TableCell
                      align="left"
                      className={classes.tableCellSelect}
                      onClick={(e) => handleOpenMenuConnectCondition(e, index)}
                    >
                      {"and"}
                      <Menu
                        elevation={0}
                        className={classes.menu}
                        keepMounted
                        anchorEl={condition.openMenuConnectCondition}
                        open={Boolean(condition.openMenuConnectCondition)}
                        onClose={(e) => {
                          handleCloseMenuConnectCondition(e, index);
                        }}
                        MenuListProps={{
                          classes: { padding: classes.paddingMenu },
                        }}
                      >
                        {menuConnectCondition.map((el) => (
                          <MenuItem
                            onMouseEnter={handleMouseEnterItem}
                            onMouseLeave={handleMouseLeaveItem}
                            onClick={(e) =>
                              handleCloseMenuConnectCondition(e, index)
                            }
                            value={el}
                          >
                            {el}
                          </MenuItem>
                        ))}
                      </Menu>
                    </TableCell>
                    <TableCell align="center" className={classes.tableCellIcon}>
                      <DeleteOutlineOutlinedIcon
                        className={classes.iconDeleteButton}
                      />
                    </TableCell>
                  </TableRow>
                ))}

                <TableRow>
                  <Button variant="outlined" className={classes.tableRowButton}>
                    <AddIcon />
                  </Button>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConditionNodeDetail;
