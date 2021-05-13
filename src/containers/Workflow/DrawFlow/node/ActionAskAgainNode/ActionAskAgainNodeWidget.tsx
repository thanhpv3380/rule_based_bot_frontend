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
import { ActionAskAgainNodeModel } from '.';
import * as _ from 'lodash';
import useStyles from './ActionAskAgainNodeWidget.style';
import { Action, InputType } from '@projectstorm/react-canvas-core';
import { DataResponse, ActionsResponse } from './ActionAskAgainNodeWidget.type';
import apis from '../../../../../apis';
import { BaseNodeModel } from '../BaseNodeModel';
import { AdvancedDiagramEngine } from '../../AdvancedDiagramEngine';
import { ActionIcon } from '../../icon';
import textDefault from '../../../../../constants/textDefault';

export interface ActionNodeWidgetProps {
  node: ActionAskAgainNodeModel;
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
  const [actions, setActions] = useState<ActionsResponse[]>();
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const fetchActions = async () => {
    const data: DataResponse = await apis.action.getActions();
    if (data && data.status) {
      setActions(data.result.actions);
      setAction(data.result.actions.find((el) => el.id === node.itemId));
    }
  };

  useEffect(() => {
    fetchActions();
  }, [action]);

  const handleOpenEdit = () => {
    setOpenEdit(true);
    engine.getActionEventBus().deregisterAction(actionMouseWheel);
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
      .getSelectedEntities()[0] as ActionAskAgainNodeModel;

    const newNode = new ActionAskAgainNodeModel();
    newNode.setPosition(
      selectedEntities.getPosition().x + 20,
      selectedEntities.getPosition().y + 20,
    );
    engine.getModel().addNode(newNode);
    // engine.getModel().addNode(newNode);
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

  return (
    <Box
      className={classes.boxContainer}
      onMouseOver={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {isHover ? (
        <Box className={classes.iconMenu}>
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
          <SettingsIcon
            fontSize="small"
            onClick={() => setOpenModal(true)}
            className={classes.iconMenuItem}
          />
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
        <Grid container justify="center" className={classes.grid}>
          <ActionIcon
            backgroundColor="#ebe0f1"
            className={classes.iconHeader}
            onClick={() => setOpenModal(true)}
          />
          <Typography variant="h6">Action Ask Again</Typography>
        </Grid>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <PortWidget
            engine={props.engine}
            port={props.node.getPort('out-left')}
          >
            <div className="circle-port" />
          </PortWidget>
          <div className={classes.paper}>
            <form //onSubmit={handleSubmit}
            >
              <Grid>
                <Typography variant="h6">Setting ask again</Typography>
                <FormControl fullWidth className={classes.formControl}>
                  <Typography>{textDefault.ACTION_ASK_AGAIN}</Typography>

                  <Autocomplete
                    size="medium"
                    options={actions}
                    getOptionSelected={(option, value) =>
                      option.id === value.id
                    }
                    getOptionLabel={(option) => option.name}
                    name="actionAskAgain"
                    onChange={(e, value) => {
                      // setActionAskAgain(value);
                    }}
                    // value={actionAskAgain || {}}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        classes={{
                          root: classes.textInput,
                        }}
                      />
                    )}
                  />
                </FormControl>
                <FormControl className={classes.formControl}>
                  <Typography>{textDefault.NUMBER_OF_LOOP}</Typography>
                  <TextField
                    // onChange={handleNumberOfLoop}
                    name="numberOfLoop"
                    type="number"
                    // defaultValue={numberOfLoop}
                    classes={{
                      root: classes.mutiInput,
                    }}
                    variant="outlined"
                  />
                </FormControl>
                <FormControl
                  fullWidth
                  variant="outlined"
                  className={classes.formControl}
                >
                  <Typography>{textDefault.ACTION_BREAK}</Typography>
                  <Autocomplete
                    size="medium"
                    options={actions}
                    getOptionSelected={(option, value) =>
                      option.id === value.id
                    }
                    getOptionLabel={(option) => option.name}
                    name="actionBreak"
                    onChange={(e, value) => {
                      // setActionBreak(value);
                    }}
                    // value={actionBreak || {}}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        classes={{
                          root: classes.textInput,
                        }}
                      />
                    )}
                  />
                </FormControl>
              </Grid>
            </form>
          </div>
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
    </Box>
  );
};

export default ActionNodeNodeWidget;
