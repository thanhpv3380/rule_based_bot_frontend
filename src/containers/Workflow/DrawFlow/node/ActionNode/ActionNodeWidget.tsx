import * as React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { DiagramEngine, PortWidget } from '@projectstorm/react-diagrams';
import {
  Box,
  TextField,
  Paper,
  Typography,
  Grid,
  Button,
  Modal,
  FormControl,
  Collapse,
} from '@material-ui/core';
import {
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  DeleteOutline as DeleteOutlineIcon,
  FileCopy as FileCopyIcon,
  Sms as SmsIcon,
  Settings as SettingsIcon,
} from '@material-ui/icons';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { ActionNodeModel } from './';
import { ActionAskAgainNodeModel } from '../';
import ActionNodeDetail from './NodeDetail/index';
import * as _ from 'lodash';
import useStyles from './ActionNodeWidget.style';
import { Action, InputType } from '@projectstorm/react-canvas-core';
import {
  DataResponse,
  ActionsResponse,
  ActionAskAgainResponse,
} from './ActionNodeWidget.type';
import apis from '../.././../../../apis';
import { BaseNodeModel } from '../BaseNodeModel';
import { AdvancedDiagramEngine } from '../../AdvancedDiagramEngine';
import { ActionIcon } from '../../icon';
import textDefault from '../../../../../constants/textDefault';
import ActionAskAgain from './ActionAskAgain';
export interface ActionNodeWidgetProps {
  node: ActionNodeModel;
  engine: AdvancedDiagramEngine;
}

const ActionNodeNodeWidget = (props: ActionNodeWidgetProps) => {
  const { node, engine } = props;
  const { workflowId } = useParams();
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [isHover, setIsHover] = useState(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [actionMouseWheel] = useState<Action>(
    engine.getActionEventBus().getActionsForType(InputType.MOUSE_WHEEL)[0],
  );
  const [action, setAction] = useState<ActionsResponse>();
  const [
    actionAskAgain,
    setActionAskAgain,
  ] = useState<ActionAskAgainResponse>();
  const [actions, setActions] = useState<ActionsResponse[]>();
  const [isFocus, setIsFocus] = useState<boolean>(false);

  const fetchActions = async () => {
    const data: DataResponse = await apis.action.getActions();
    if (data && data.status) {
      setActions(data.result.actions);
      setAction(data.result.actions.find((el) => el.id === node.itemId));
    }
  };

  const handleOpenEdit = () => {
    setOpenEdit(true);
    engine.getActionEventBus().deregisterAction(actionMouseWheel);
    engine.repaintCanvas();
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setIsHover(false);
    engine.getActionEventBus().registerAction(actionMouseWheel);
    engine.repaintCanvas();
  };

  const handleDeleteNode = async () => {
    await node.delete(engine, workflowId);
  };

  const handleDuplicateNode = () => {
    const selectedEntities = engine
      .getModel()
      .getSelectedEntities()[0] as ActionNodeModel;

    node.duplicateNode(
      engine,
      selectedEntities.getPosition().x + 20,
      selectedEntities.getPosition().y + 20,
    );
  };

  const handleOpenAutocomplete = () => {
    engine.getActionEventBus().deregisterAction(actionMouseWheel);
    engine.repaintCanvas();
  };

  const handleCloseAutocomplete = () => {
    engine.getActionEventBus().registerAction(actionMouseWheel);
    engine.repaintCanvas();
  };

  const handleCreateAAAgainNode = async (data?: any) => {
    const listPortOut = node.getArrayLinkByPortType('out');
    const checkExistAAANode = listPortOut.find(
      (el) => el.getTargetPort().getParent() instanceof ActionAskAgainNodeModel,
    );

    if (!checkExistAAANode) {
      const posX = node.getX();
      const posY = node.getY();

      const sourcePortOutRight = node.getPort('out-right');
      const link = sourcePortOutRight.createLinkModel();
      link.setSourcePort(sourcePortOutRight);
      link.getFirstPoint().setPosition(posX, posY);

      const actionAskAgainNode = new ActionAskAgainNodeModel({
        nodeInfo: data,
        actionNodeId: node.id,
      });
      actionAskAgainNode.setPosition(posX + 300, posY);
      link
        .getLastPoint()
        .setPosition(actionAskAgainNode.getX(), actionAskAgainNode.getY());
      // create action ask again node
      const targetPortIn = actionAskAgainNode.getPort('in');

      if (link.getSourcePort().canLinkToPort(targetPortIn)) {
        link.setTargetPort(targetPortIn);
        targetPortIn.reportPosition();
        const model = engine.getModel();
        model.addNode(actionAskAgainNode);
        model.addLink(link);
        engine.repaintCanvas();
      } else {
        link.remove();
      }
    }
  };

  useEffect(() => {
    if (node && node.actionAskAgain) {
      //handleCreateAAAgainNode(node.actionAskAgain);
      setActionAskAgain(node.actionAskAgain);
    }
  }, []);

  useEffect(() => {
    fetchActions();
  }, [action]);

  const handleChangeActionAskAgain = (name, value) => {
    const newActionAskAgain = { ...actionAskAgain, [name]: value };
    node.actionAskAgain = { ...newActionAskAgain };
    setActionAskAgain({ ...newActionAskAgain });
  };
  return (
    <Box
      className={classes.boxContainer}
      onMouseOver={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
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
      <Paper
        elevation={5}
        className={classes.customRadius}
        onBlur={() => setIsFocus(false)}
      >
        <PortWidget
          engine={props.engine}
          port={props.node.getPort('in')}
        ></PortWidget>
        <Box className={classes.grid}>
          <Box display="flex">
            <ActionIcon
              backgroundColor="#ebe0f1"
              className={classes.iconHeader}
            />
            <Typography variant="h6">Action</Typography>
          </Box>
          <SettingsIcon onClick={() => handleCreateAAAgainNode()} />
        </Box>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <PortWidget
            engine={props.engine}
            port={props.node.getPort('out-left')}
          >
            <div className="circle-port" />
          </PortWidget>
          <Box
            display="flex"
            flexDirection="column"
            paddingX={2}
            paddingY={4}
            flexGrow={1}
          >
            <Autocomplete
              className={classes.autoComplete}
              size="small"
              options={actions || []}
              value={action || null}
              onChange={(
                e: React.ChangeEvent<{}>,
                value: any,
                reason: string,
              ) => {
                node.itemId = (value && value.id) || null;
                setAction(value);
              }}
              onOpen={handleOpenAutocomplete}
              onClose={handleCloseAutocomplete}
              getOptionSelected={(option, value) => option.id === value.id}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Select action"
                  variant="outlined"
                />
              )}
            />
            <ActionAskAgain
              actions={actions}
              actionAskAgain={actionAskAgain}
              handleChange={handleChangeActionAskAgain}
            />
          </Box>
          <PortWidget
            engine={props.engine}
            port={props.node.getPort('out-right')}
          >
            <div className="circle-port" />
          </PortWidget>
        </Box>
        <Grid container alignItems="center" justify="center">
          <PortWidget
            engine={props.engine}
            port={props.node.getPort('out-bottom')}
          >
            <div className="circle-port" />
          </PortWidget>
        </Grid>
      </Paper>
      <ActionNodeDetail open={openEdit} handleCloseEdit={handleCloseEdit} />
    </Box>
  );
};

export default ActionNodeNodeWidget;
