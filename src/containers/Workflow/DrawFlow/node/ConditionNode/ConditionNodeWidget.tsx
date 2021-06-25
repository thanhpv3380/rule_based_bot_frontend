import * as React from 'react';
import { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { useParams } from 'react-router-dom';
import { PortWidget } from '@projectstorm/react-diagrams-core';
import {
  Action,
  ActionEvent,
  InputType,
} from '@projectstorm/react-canvas-core';
import {
  Button,
  Box,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  Typography,
  Divider,
} from '@material-ui/core';
import {
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  DeleteOutline as DeleteOutlineIcon,
  FileCopy as FileCopyIcon,
  DeviceHubSharp as DeviceHubSharpIcon,
  Add as AddIcon,
} from '@material-ui/icons';
import { ConditionIcon } from '../../icon';
import { ConditionNodeModel } from './index';
import * as _ from 'lodash';
import ConditionNodeDetail from './NodeDetail';
import { AdvancedDiagramEngine } from '../../AdvancedDiagramEngine';
import useStyle from './ConditionNodeWidget.style';
import {
  Condition,
  Conditions,
  DataIntentResponse,
  IntentResponse,
  Parameter,
} from './Condition.types';
import { BaseNodeModel } from '../BaseNodeModel';
import apis from '../../../../../apis';
import { NodeConnect } from '../Node.types';
import { useConfirm } from 'material-ui-confirm';

export interface ConditionNodeWidgetProps {
  node: ConditionNodeModel;
  engine: AdvancedDiagramEngine;
}

export interface ConditionNodeWidgetState {
  isHover: Boolean;
  open: boolean;
}

const conditionsDefault = {
  intentId: null,
  parameter: {
    intentId: '',
    name: '',
    id: '',
  },
  operator: 'is',
  value: '',
  openMenuConnectCondition: null,
  openMenuOperator: null,
};

const ConditionNodeWidget = (props: ConditionNodeWidgetProps) => {
  const { engine, node } = props;
  const { workflowId } = useParams();
  const classes = useStyle();
  const confirm = useConfirm();
  const { enqueueSnackbar } = useSnackbar();
  const [condition, setCondition] = useState<Condition>();
  const [subConditions, setSubConditions] = useState<Conditions[]>([]);
  const [isHover, setIsHover] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [actionMouseWheel] = useState<Action>(
    engine.getActionEventBus().getActionsForType(InputType.MOUSE_WHEEL)[0],
  );
  const [intent, setIntent] = useState<IntentResponse>();
  const [parameters, setParameters] = useState<Parameter[]>();
  const [slots, setSlots] = useState([]);

  const fetchSlots = async () => {
    const data = await apis.slot.getSlots();
    if (data && data.status) {
      setSlots(data.result.slots);
      return data.result.slots;
    }
    return [];
  };

  const fetchCondition = async (id: string) => {
    const data = await apis.condition.getConditionById(id);
    if (data && data.status) {
      setCondition(data.result);

      setSubConditions(
        data.result.conditions.map((el) => {
          return {
            ...el,
            parameter: {
              ...el.parameter,
              intentId: el.intent,
            },
          };
        }),
      );
    }
  };

  useEffect(() => {
    if (node.itemId) {
      fetchCondition(node.itemId);
    }
  }, []);

  const handleOpenEdit = async () => {
    setOpenEdit(true);
    const listSlot = await fetchSlots();
    const newListSlot = listSlot.map((el) => ({
      ...el,
      parameterName: el.name,
    }));
    let tempParameters = [...newListSlot];
    let listNode = [];
    const getIntentParent = (tempNode) => {
      const links = tempNode.getPort('in').getLinks();
      Object.keys(links).forEach((el: string) => {
        const nodeEle: any = links[el].getSourcePort().getParent();

        if (listNode.indexOf(nodeEle.id) <= 0) {
          listNode.push(nodeEle.id);
          if (nodeEle.getType() === 'INTENT') {
            if (nodeEle.itemId) {
              console.log(nodeEle, 'ele');

              tempParameters.push(
                ...nodeEle.nodeInfo.parameters.map((el) => {
                  return { ...el, intentId: nodeEle.nodeInfo.id };
                }),
              );
            }
          }
          getIntentParent(nodeEle);
        }
      });
    };
    console.log(tempParameters, 'tempParameters');

    getIntentParent(node);
    setParameters(tempParameters || []);
    engine.getActionEventBus().deregisterAction(actionMouseWheel);
    engine.repaintCanvas();
  };

  const handleCloseEdit = async () => {
    setOpenEdit(false);
    setIsHover(false);
    engine.getActionEventBus().registerAction(actionMouseWheel);
    engine.repaintCanvas();
    if (subConditions) {
      const newCondition = {
        conditions: subConditions.map((el) => {
          return {
            intent: el.parameter.intentId || el.intentId,
            parameter: el.parameter.id,
            value: el.value,
            operator: el.operator,
          };
        }),
        operator: condition.operator,
      };
      console.log(subConditions, newCondition);

      const data = await apis.condition.updateCondition(
        node.itemId,
        newCondition,
      );
      if (data && !data.status) {
      }
    }
  };

  const handleOpenMenuOperator = (e: any, index: number) => {
    const newConditions = [...subConditions];
    newConditions[index].openMenuOperator = e.currentTarget;
    setSubConditions(newConditions);
  };

  const handleCloseMenuOperator = (e: any, index: number) => {
    const newConditions = [...subConditions];
    newConditions[index].openMenuOperator = null;
    setSubConditions(newConditions);
  };

  const handleCloseMenuConnectCondition = (e: any, index: number) => {
    const newConditions = [...subConditions];
    newConditions[index].openMenuConnectCondition = null;
    setSubConditions(newConditions);
  };

  const handleOpenMenuConnectCondition = (e: any, index: number) => {
    const newConditions = [...subConditions];
    newConditions[index].openMenuConnectCondition = e.currentTarget;
    setSubConditions(newConditions);
  };

  const handleDeleteNode = async () => {
    confirm({
      description: `Are you sure you want to delete ${node.id}?`,
    }).then(async () => {
      const status = await node.delete(engine, workflowId);
      if (status) {
        enqueueSnackbar('Delete node success', { variant: 'success' });
      } else {
        enqueueSnackbar('Delete node failed', { variant: 'error' });
      }
    });
  };

  const handleDuplicateNode = () => {
    const selectedEntities = engine
      .getModel()
      .getSelectedEntities()[0] as ConditionNodeModel;

    let newNode = new ConditionNodeModel();
    newNode.setPosition(
      selectedEntities.getPosition().x + 20,
      selectedEntities.getPosition().y + 20,
    );
    engine.getModel().addNode(newNode);
    engine.repaintCanvas();
  };

  const handleAddCondition = () => {
    const newConditions = [...subConditions];
    newConditions.push({ ...conditionsDefault });
    setSubConditions(newConditions);
    if (!condition) {
      const newCondition: Condition = {
        operator: 'and',
        conditions: [],
        createBy: { id: '', name: 'null' },
        bot: { id: '', name: '' },
      };
      setCondition(newCondition);
    }
  };

  const handleDeleteCondition = (pos: number) => {
    const newConditions = [...subConditions];
    newConditions.splice(pos, 1);
    setSubConditions(newConditions);
  };

  const handleChangeCondition = (name: string, value: any, pos: number) => {
    console.log(subConditions, 'old', name, value, pos);

    if (name === 'subOperator') {
      const newSubConditions: Conditions[] = [...subConditions];
      newSubConditions[pos].operator = value.toString();
      setSubConditions(newSubConditions);
    } else if (name === 'operator') {
      const newCondition = { ...condition };
      newCondition.operator = value.toString();
      setCondition(newCondition);
    } else if (name === 'value') {
      // console.log(value.toString());
      const newSubConditions: Conditions[] = [...subConditions];
      newSubConditions[pos].value = value;
      setSubConditions(newSubConditions);
    } else if (name === 'parameter') {
      const newSubConditions: Conditions[] = [...subConditions];
      newSubConditions[pos].parameter = value && {
        id: value.id,
        name: value.parameterName,
        intentId: value.intentId,
      };

      setSubConditions(newSubConditions);
    }
  };

  return (
    <Box
      onMouseOver={() => {
        setIsHover(true);
      }}
      onMouseLeave={() => {
        setIsHover(false);
      }}
    >
      {isHover ? (
        <Box className={classes.iconMenu}>
          <EditIcon
            fontSize="small"
            className={classes.iconMenuItem}
            onClick={handleOpenEdit}
          />
          <DeleteOutlineIcon
            fontSize="small"
            onClick={() => handleDeleteNode()}
            className={classes.iconMenuItem}
          />
          <FileCopyIcon
            onClick={() => handleDuplicateNode()}
            className={classes.fileCopyIcon}
          />
        </Box>
      ) : (
        <Box className={classes.noneIconMenu} />
      )}

      <Paper elevation={2} className={classes.root}>
        <Box display="flex" flexDirection="column">
          <PortWidget engine={props.engine} port={props.node.getPort('in')} />
          <Box className={classes.grid}>
            <ConditionIcon
              backgroundColor="#e7fff6"
              className={classes.iconHeader}
            />
            <Typography variant="h6">Condition</Typography>
          </Box>

          <Box>
            <Box display="flex" justifyContent="center" alignItems="center">
              <PortWidget
                engine={props.engine}
                port={props.node.getPort('out-left')}
              >
                <div className="circle-port" />
              </PortWidget>
              <Box m={2}>
                <TableContainer
                  component={Paper}
                  elevation={0}
                  className={
                    subConditions.length !== 0
                      ? classes.tableContainer
                      : classes.noneTableCon
                  }
                  onClick={handleOpenEdit}
                >
                  <Table>
                    <TableBody>
                      {subConditions &&
                        subConditions.map((el, index) => (
                          <TableRow>
                            <TableCell
                              className={classes.tableCell}
                              align="left"
                            >
                              if
                            </TableCell>
                            <TableCell className={classes.tableCell}>
                              {(el && el.parameter && el.parameter.name) || (
                                <Typography
                                  style={{ color: 'rgba(138, 138, 138, 0.87)' }}
                                >
                                  parameter
                                </Typography>
                              )}
                            </TableCell>
                            <TableCell
                              className={classes.tableCell}
                              align="left"
                            >
                              {el.operator}
                            </TableCell>
                            <TableCell
                              className={classes.tableCell}
                              style={{ minWidth: 80 }}
                              align="left"
                            >
                              {el.value || (
                                <Typography
                                  style={{ color: 'rgba(138, 138, 138, 0.87)' }}
                                >
                                  empty
                                </Typography>
                              )}
                            </TableCell>
                            <TableCell
                              className={classes.tableCell}
                              align="left"
                            >
                              {condition ? condition.operator : 'and'}
                            </TableCell>
                          </TableRow>
                        ))}
                      {/* {!subConditions ||
                    (subConditions.length === 0 && ( */}
                      {/* <TableRow container > */}

                      {/* </TableRow> */}
                      {/* ))} */}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Grid
                  container
                  alignItems="center"
                  justify="center"
                  className={classes.btnAdCondition}
                >
                  <Button
                    onClick={() => {
                      handleOpenEdit();
                      handleAddCondition();
                    }}
                  >
                    <AddIcon />
                    Add condition
                  </Button>
                </Grid>
              </Box>
              <PortWidget
                engine={props.engine}
                port={props.node.getPort('out-right')}
              >
                <div className="circle-port" />
              </PortWidget>
            </Box>
            <Grid
              container
              alignItems="center"
              justify="center"
              // className={classes.btnAdCondition}
            >
              <PortWidget
                engine={props.engine}
                port={props.node.getPort('out-bottom')}
              >
                <div className="circle-port" />
              </PortWidget>
            </Grid>
          </Box>
        </Box>
      </Paper>

      <ConditionNodeDetail
        open={openEdit}
        parameters={parameters}
        subConditions={subConditions}
        condition={condition}
        handleOpenMenuOperator={handleOpenMenuOperator}
        handleCloseMenuOperator={handleCloseMenuOperator}
        handleCloseMenuConnectCondition={handleCloseMenuConnectCondition}
        handleOpenMenuConnectCondition={handleOpenMenuConnectCondition}
        handleCloseEdit={handleCloseEdit}
        handleAddCondition={handleAddCondition}
        handleDeleteCondition={handleDeleteCondition}
        handleChangeCondition={handleChangeCondition}
      />
    </Box>
  );
};

export default ConditionNodeWidget;
