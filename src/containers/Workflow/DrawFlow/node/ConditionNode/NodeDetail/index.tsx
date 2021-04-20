import * as React from 'react';
import { useState } from 'react';
import { DiagramEngine, PortWidget } from '@projectstorm/react-diagrams-core';
import {
  CanvasWidget,
  Action,
  ActionEvent,
  InputType,
} from '@projectstorm/react-canvas-core';
import {
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  InputBase,
  Select,
  MenuItem,
  Menu,
  Typography,
  Grid,
  Modal,
  TextField,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  MoreVert as MoreVertIcon,
  Edit as Editcon,
  DeleteOutline as DeleteOutlineIcon,
  FileCopy as FileCopyIcon,
  DeviceHubSharp as DeviceHubSharpIcon,
  Close as CloseIcon,
  DeleteOutlineOutlined as DeleteOutlineOutlinedIcon,
  Add as AddIcon,
} from '@material-ui/icons';
import useStyle from './index.style';
import { Conditions, Condition, Parameter } from '../Condition.types';

const menuOperator: string[] = ['=', '!=', '>', '<', 'start with'];
const menuConnectCondition: string[] = ['and', 'or'];

interface ConditionNodeDetail {
  open: boolean;
  parameters: Parameter[];
  subConditions: Conditions[];
  condition: Condition;
  handleOpenMenuOperator: Function;
  handleCloseMenuOperator: Function;
  handleCloseMenuConnectCondition: Function;
  handleOpenMenuConnectCondition: Function;
  handleCloseEdit: Function;
  handleAddCondition: Function;
  handleDeleteCondition: Function;
  handleChangeCondition: Function;
}

const ConditionNodeDetail = (props: ConditionNodeDetail) => {
  const classes = useStyle();
  const {
    open,
    parameters,
    subConditions,
    condition,
    handleOpenMenuOperator,
    handleCloseMenuOperator,
    handleCloseMenuConnectCondition,
    handleOpenMenuConnectCondition,
    handleCloseEdit,
    handleAddCondition,
    handleDeleteCondition,
    handleChangeCondition,
  } = props;

  React.useEffect(() => {}, [subConditions, parameters]);
  const handleMouseEnterItem = (e: any) => {
    e.target.style.backgroundColor = '#208ef0';
  };
  const handleMouseLeaveItem = (e: any) => {
    e.target.style.backgroundColor = '#ffff';
  };

  return (
    <Modal
      className={classes.modal}
      open={open}
      onClose={() => handleCloseEdit()}
    >
      <Box className={classes.root}>
        <Grid container justify="space-between">
          <Grid item className={classes.gridHeaderTiltle}>
            <Typography variant="h6">Condition</Typography>
          </Grid>
          <Grid item className={classes.gridHeaderIcon}>
            <CloseIcon onClick={() => handleCloseEdit()} />
          </Grid>
        </Grid>
        <Box className={classes.body}>
          <TableContainer>
            <Table size="small" className={classes.table}>
              <TableBody>
                {subConditions.map((el, pos) => (
                  <TableRow className={classes.tableRow}>
                    <TableCell
                      component="th"
                      scope="row"
                      className={classes.tableCellInput}
                    >
                      <Autocomplete
                        size="small"
                        fullWidth
                        options={parameters || []}
                        value={
                          (parameters &&
                            parameters.find(
                              (item) => item.parameterName === el.parameter,
                            )) ||
                          null
                        }
                        // getOptionSelected={(option, value) =>
                        //   option.parameterName === value.parameterName
                        // }
                        onChange={(e, value) =>
                          handleChangeCondition(e, pos, value)
                        }
                        getOptionLabel={(option) => option.parameterName}
                        renderInput={(params) => (
                          <InputBase
                            ref={params.InputProps.ref}
                            inputProps={params.inputProps}
                          />
                        )}
                      />
                    </TableCell>
                    <TableCell
                      align="left"
                      className={classes.tableCellSelect}
                      onClick={(e) => handleOpenMenuOperator(e, pos)}
                    >
                      <Select
                        fullWidth
                        elevation={0}
                        value={el.operator}
                        input={<InputBase />}
                        IconComponent={() => <div />}
                        name="subOperator"
                        onChange={(e) => handleChangeCondition(e, pos)}
                      >
                        {menuOperator.map((el) => (
                          <MenuItem
                            onMouseEnter={handleMouseEnterItem}
                            onMouseLeave={handleMouseLeaveItem}
                            // onClick={(e) => handleCloseMenuOperator(e, pos)}
                            value={el}
                          >
                            {el}
                          </MenuItem>
                        ))}
                      </Select>
                    </TableCell>
                    <TableCell align="left" className={classes.tableCellInput}>
                      <InputBase
                        placeholder="Giá trị"
                        name="value"
                        value={el.value}
                        onChange={(e) => handleChangeCondition(e, pos)}
                      />
                    </TableCell>
                    <TableCell
                      align="left"
                      className={classes.tableCellSelect}
                      onClick={(e) => handleOpenMenuConnectCondition(e, pos)}
                    >
                      <Select
                        // className={classes.menu}
                        value={condition ? condition.operator : 'and'}
                        input={<InputBase />}
                        IconComponent={() => <div />}
                        onChange={(e) => handleChangeCondition(e)}
                        name="operator"
                        // MenuListProps={{
                        //   classes: { padding: classes.paddingMenu },
                        // }}
                      >
                        {menuConnectCondition.map((el) => (
                          <MenuItem
                            onMouseEnter={handleMouseEnterItem}
                            onMouseLeave={handleMouseLeaveItem}
                            onClick={(e) =>
                              handleCloseMenuConnectCondition(e, pos)
                            }
                            value={el}
                          >
                            {el}
                          </MenuItem>
                        ))}
                      </Select>
                    </TableCell>
                    <TableCell align="center" className={classes.tableCellIcon}>
                      <DeleteOutlineOutlinedIcon
                        className={classes.iconDeleteButton}
                        onClick={() => handleDeleteCondition(pos)}
                      />
                    </TableCell>
                  </TableRow>
                ))}

                <TableRow>
                  <Button
                    variant="outlined"
                    className={classes.tableRowButton}
                    onClick={() => handleAddCondition()}
                  >
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
