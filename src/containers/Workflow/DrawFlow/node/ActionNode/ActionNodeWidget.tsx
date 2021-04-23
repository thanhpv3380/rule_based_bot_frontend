import * as React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { DiagramEngine, PortWidget } from '@projectstorm/react-diagrams';
import { Box, TextField, Paper, Typography, Grid } from '@material-ui/core';
import {
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  DeleteOutline as DeleteOutlineIcon,
  FileCopy as FileCopyIcon,
  Sms as SmsIcon,
} from '@material-ui/icons';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { ActionNodeModel } from './';
import ActionNodeDetail from './NodeDetail/index';
import * as _ from 'lodash';
import useStyles from './ActionNodeWidget.style';
import { Action, InputType } from '@projectstorm/react-canvas-core';
import { DataResponse, ActionsResponse } from './ActionNodeWidget.type';
import apis from '../.././../../../apis';
import { BaseNodeModel } from '../BaseNodeModel';

export interface ActionNodeWidgetProps {
  node: ActionNodeModel;
  engine: DiagramEngine;
}

const ActionNodeNodeWidget = (props: ActionNodeWidgetProps) => {
  const { node, engine } = props;
  const { workflowId } = useParams();
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [isHover, setIsHover] = useState(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [actionMouseWheel, setActionMouseWheel] = useState<Action>();
  const [action, setAction] = useState<ActionsResponse>();
  const [actions, setActions] = useState<ActionsResponse[]>();

  const fetchActions = async () => {
    const data: DataResponse = await apis.action.getActions();
    if (data && data.status) {
      setActions(data.result.actions);
      setAction(data.result.actions.find((el) => el.id === node.itemId));
    }
  };

  useEffect(() => {
    fetchActions();
  }, []);

  const handleOpenEdit = () => {
    setOpenEdit(true);
    const action: Action = engine
      .getActionEventBus()
      .getActionsForType(InputType.MOUSE_WHEEL)[0];
    engine.getActionEventBus().deregisterAction(action);
    engine.repaintCanvas();
    setActionMouseWheel(action);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    engine.getActionEventBus().registerAction(actionMouseWheel);
    engine.repaintCanvas();
  };

  const handleDeleteNode = async () => {
    const selectedEntities = engine.getModel().getSelectedEntities();
    if (selectedEntities.length > 0) {
      const confirm = window.confirm('Are you sure you want to delete?');

      if (confirm) {
        _.forEach(selectedEntities, async (model) => {
          // only delete items which are not locked
          if (!model.isLocked()) {
            const data = await apis.node.deleteNode(
              workflowId,
              (model as BaseNodeModel).id,
            );
            if (data && data.status) {
              model.remove();
              engine.repaintCanvas();
            } else {
              enqueueSnackbar((data && data.message) || 'Delete node failed', {
                variant: 'error',
              });
            }
          }
        });
        engine.repaintCanvas();
      }
    }
  };

  const handleDuplicateNode = () => {
    const selectedEntities = engine
      .getModel()
      .getSelectedEntities()[0] as ActionNodeModel;

    const newNode = new ActionNodeModel();
    newNode.setPosition(
      selectedEntities.getPosition().x + 20,
      selectedEntities.getPosition().y + 20,
    );
    engine.getModel().addNode(newNode);
    // engine.getModel().addNode(newNode);
    engine.repaintCanvas();
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
      <Paper className={classes.customRadius}>
        <PortWidget
          engine={props.engine}
          port={props.node.getPort('in')}
        ></PortWidget>
        <Grid container justify="center" className={classes.grid}>
          <SmsIcon className={classes.customIcon} />
          <Typography variant="h6">Action</Typography>
        </Grid>

        <Autocomplete
          className={classes.autoComplete}
          size="small"
          options={actions}
          value={action || null}
          onChange={(e: React.ChangeEvent<{}>, value: any, reason: string) => {
            node.itemId = (value && value.id) || null;
            setAction(value);
          }}
          getOptionSelected={(option, value) => option.id === value.id}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField {...params} className={classes.textField} />
          )}
        />
        <Grid container alignItems="center" justify="center">
          <PortWidget engine={props.engine} port={props.node.getPort('out')}>
            <div className="circle-port" />
          </PortWidget>
        </Grid>
      </Paper>
      <ActionNodeDetail open={openEdit} handleCloseEdit={handleCloseEdit} />
    </Box>
  );
};

export default ActionNodeNodeWidget;
