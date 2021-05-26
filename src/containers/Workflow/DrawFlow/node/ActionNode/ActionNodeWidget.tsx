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
  Add as AddIcon,
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
import { useConfirm } from 'material-ui-confirm';

export interface ActionNodeWidgetProps {
  node: ActionNodeModel;
  engine: AdvancedDiagramEngine;
}

const ActionNodeNodeWidget = (props: ActionNodeWidgetProps) => {
  const { node, engine } = props;
  const { workflowId } = useParams();
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const confirm = useConfirm();
  const [isHover, setIsHover] = useState(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [actionMouseWheel] = useState<Action>(
    engine.getActionEventBus().getActionsForType(InputType.MOUSE_WHEEL)[0],
  );
  const [action, setAction] = useState<ActionsResponse>();
  const [actionEditId, setActionEditId] = useState<any>();
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
    setActionEditId(action?.id);
    setOpenEdit(true);
    engine.getActionEventBus().deregisterAction(actionMouseWheel);
    engine.repaintCanvas();
  };

  const handleOpenAdd = () => {
    setActionEditId(null);
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
      .getSelectedEntities()[0] as ActionNodeModel;

    let newNode = new ActionNodeModel();
    newNode.setPosition(
      selectedEntities.getPosition().x + 20,
      selectedEntities.getPosition().y + 20,
    );
    engine.getModel().addNode(newNode);
    engine.repaintCanvas();
  };

  const handleOpenAutocomplete = () => {
    engine.getActionEventBus().deregisterAction(actionMouseWheel);
    engine.repaintCanvas();
  };

  const handleCloseAutocomplete = () => {
    engine.getActionEventBus().registerAction(actionMouseWheel);
    engine.repaintCanvas();
  };

  useEffect(() => {
    if (node && node.actionAskAgain) {
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

  const handleCreateItem = (data) => {
    setActions([{ ...data }, ...actions]);
  };

  const handleOpenAAADetail = (status) => {
    console.log('fdsfsd');
    let size = 250;
    if (!status) size = -250;
    node.updatePositionOutNodeConnect(engine, 0, size);
  };

  return (
    <Box
      className={classes.boxContainer}
      onMouseOver={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {isHover ? (
        <Box className={classes.iconMenu}>
          <AddIcon
            fontSize="small"
            className={classes.iconMenuItem}
            onClick={handleOpenAdd}
          />
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
      <Paper
        elevation={2}
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
        </Box>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <PortWidget
            engine={props.engine}
            port={props.node.getPort('out-left')}
          >
            <div className="circle-port" />
          </PortWidget>
          <Box display="flex" flexDirection="column" flexGrow={1} m={2}>
            <Box className={classes.focusBody}>
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
                    className={classes.textField}
                    InputProps={{
                      ...params.InputProps,
                      disableUnderline: true,
                    }}
                    placeholder="Select action"
                  />
                )}
              />
            </Box>
            <Box>
              <ActionAskAgain
                actions={actions}
                actionAskAgain={actionAskAgain}
                handleChange={handleChangeActionAskAgain}
                handleOpenAAADetail={handleOpenAAADetail}
              />
            </Box>
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
      <ActionNodeDetail
        open={openEdit}
        handleCloseEdit={handleCloseEdit}
        actionId={actionEditId}
        handleCreateItem={handleCreateItem}
      />
    </Box>
  );
};

export default ActionNodeNodeWidget;
