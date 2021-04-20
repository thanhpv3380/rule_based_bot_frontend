import * as React from 'react';
import { useState, useEffect } from 'react';
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

export interface ConditionNodeWidgetProps {
  node: ConditionNodeModel;
  engine: AdvancedDiagramEngine;
}

export interface ConditionNodeWidgetState {
  isHover: Boolean;
  open: boolean;
}

const conditionsDefault: Conditions = {
  parameter: '',
  operator: '=',
  value: '',
  openMenuConnectCondition: null,
  openMenuOperator: null,
};

const ConditionNodeWidget = (props: ConditionNodeWidgetProps) => {
  const { engine, node } = props;
  const { workflowId } = useParams();
  const classes = useStyle();
  const [conditon, setContion] = useState<Condition>();
  const [subConditions, setSubConditions] = useState<Conditions[]>([]);
  const [isHover, setIsHover] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [actionMouseWheel, setActionMouseWheel] = useState<Action>();
  const [intent, setIntent] = useState<IntentResponse>();
  const [parameters, setParameters] = useState<Parameter[]>();

  const fetchCondition = async (id: string) => {
    const data = await apis.condition.getConditionById(id);
    if (data.status) {
      setContion(data.result);
      setSubConditions(data.result.conditions);
    }
  };
  const fetchIntent = async (intentId: string) => {
    const data: DataIntentResponse = await apis.intent.getIntent(intentId);
    if (data.status) {
      setParameters(data.result.parameters);
    }
  };

  useEffect(() => {
    if (node.itemId) {
      fetchCondition(node.itemId);
    }
    if (node.intentId) {
      fetchIntent(node.intentId);
    }
    console.log('reset');
  }, [node.intentId]);

  const handleOpenEdit = () => {
    setOpenEdit(true);
    const action: Action = engine
      .getActionEventBus()
      .getActionsForType(InputType.MOUSE_WHEEL)[0];
    engine.getActionEventBus().deregisterAction(action);
    engine.repaintCanvas();
    setActionMouseWheel(action);
  };

  const handleCloseEdit = async () => {
    setOpenEdit(false);
    engine.getActionEventBus().registerAction(actionMouseWheel);
    engine.repaintCanvas();
    if (subConditions) {
      console.log(subConditions, 'subCondition', conditon);
      const newCondition = {
        conditions: subConditions.map((el) => {
          return {
            parameter: el.parameter,
            intent: node.intentId,
            value: el.value,
            operator: el.operator,
          };
        }),
        operator: conditon.operator,
      };
      console.log(node.itemId, newCondition);

      const data = await apis.condition.updateCondition(
        node.itemId,
        newCondition,
      );
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

  const handleDeleteNode = () => {
    const selectedEntities = engine.getModel().getSelectedEntities();
    if (selectedEntities.length > 0) {
      const confirm = window.confirm('Are you sure you want to delete?');

      if (confirm) {
        _.forEach(selectedEntities, async (model: any) => {
          // only delete items which are not locked
          if (!model.isLocked()) {
            const data = await apis.workflow.removeNode(
              workflowId,
              (model as BaseNodeModel).id,
            );
            if (data.status) {
              await model.remove();
              engine.repaintCanvas();
            }
          }
        });
        // engine.repaintCanvas();
      }
    }
  };

  const handleDuplicateNode = () => {
    console.log('duplidacate');
    const selectedEntities = engine
      .getModel()
      .getSelectedEntities()[0] as ConditionNodeModel;

    const newNode = new ConditionNodeModel();
    newNode.setPosition(
      selectedEntities.getPosition().x + 20,
      selectedEntities.getPosition().y + 20,
    );
    engine.getModel().addNode(newNode);
    engine.repaintCanvas();
  };

  const handleAddCondition = () => {
    const newConditions = [...subConditions];
    newConditions.push(conditionsDefault);
    setSubConditions(newConditions);
    if (!conditon) {
      const newCondition: Condition = {
        operator: 'and',
        conditions: [],
        createBy: { id: '', name: 'null' },
        bot: { id: '', name: '' },
      };
      setContion(newCondition);
    }
  };

  const handleDeleteCondition = (pos: number) => {
    const newConditions = [...subConditions];
    newConditions.splice(pos, 1);
    setSubConditions(newConditions);
  };

  const handleChangeCondition = (e: any, pos: number, parameter: any) => {
    const { name, value } = e.target;
    console.log(subConditions, 'old', name, value, pos);

    if (name === 'subOperator') {
      var newSubConditions: Conditions[] = [...subConditions];
      newSubConditions[pos].operator = value;
      setSubConditions(newSubConditions);
    } else if (name === 'operator') {
      var newCondition = { ...conditon };
      newCondition.operator = value;
      setContion(newCondition);
    } else if (name === 'value') {
      var newSubConditions: Conditions[] = [...subConditions];
      newSubConditions[pos].value = value;
      setSubConditions(newSubConditions);
    } else {
      console.log(pos, 'pos');

      var newSubConditions: Conditions[] = [...subConditions];
      newSubConditions[pos].parameter = parameter.parameterName;
      console.log(newSubConditions[pos], newSubConditions);

      setSubConditions(newSubConditions);
    }
  };

  return (
    <Box
      // style={{ width: 280, borderRadius: 10 }}
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
          <MoreVertIcon fontSize="small" className={classes.iconMenuItem} />
        </Box>
      ) : (
        <Box className={classes.noneIconMenu} />
      )}

      <Paper elevation={5} className={classes.root}>
        {/*  */}
        <Box display="flex" alignItems="center" flexDirection="column">
          <PortWidget engine={props.engine} port={props.node.getPort('in')} />
          <Grid container justify="center" className={classes.header}>
            <DeviceHubSharpIcon className={classes.headerIcon} />
            <Typography variant="h6">Condition</Typography>
          </Grid>
          <Box>
            <TableContainer
              component={Paper}
              elevation={0}
              className={classes.tableContainer}
            >
              <Table>
                <TableBody>
                  {subConditions &&
                    subConditions.map((el, index) => (
                      <TableRow>
                        <TableCell className={classes.tableCell}>
                          {el.parameter}
                        </TableCell>
                        <TableCell className={classes.tableCell} align="left">
                          {el.operator}
                        </TableCell>
                        <TableCell
                          className={classes.tableCell}
                          style={{ minWidth: 80 }}
                          align="left"
                        >
                          {el.value}
                        </TableCell>
                        <TableCell className={classes.tableCell} align="left">
                          {conditon ? conditon.operator : 'and'}
                        </TableCell>
                      </TableRow>
                    ))}
                  {!subConditions ||
                    (subConditions.length === 0 && (
                      <TableRow>
                        <Button fullWidth onClick={handleOpenEdit}>
                          <AddIcon />
                          Thêm điều kiện
                        </Button>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Grid container alignItems="center" justify="center">
              <PortWidget
                engine={props.engine}
                port={props.node.getPort('out')}
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
        condition={conditon}
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
