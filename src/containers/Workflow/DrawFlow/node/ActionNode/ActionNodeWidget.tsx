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
import { ActionNodeModel } from './';
import ActionNodeDetail from './NodeDetail/index';
import * as _ from 'lodash';
import useStyles from './ActionNodeWidget.style';
import { Action, InputType } from '@projectstorm/react-canvas-core';
import { DataResponse, ActionsResponse } from './ActionNodeWidget.type';
import apis from '../.././../../../apis';
import { BaseNodeModel } from '../BaseNodeModel';
import { AdvancedDiagramEngine } from '../../AdvancedDiagramEngine';
import { ActionIcon } from '../../icon';
import textDefault from '../../../../../constants/textDefault';

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
  const [actions, setActions] = useState<ActionsResponse[]>();
  const [isForcus, setIsForcus] = useState<boolean>(false);
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

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setIsHover(false);
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
          <SettingsIcon
            fontSize="small"
            onClick={() => setOpenModal(true)}
            className={classes.iconMenuItem}
          />
          <Modal
            className={classes.modal}
            open={openModal}
            onClose={() => setOpenModal(false)}
          >
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
                {/* <Grid
                container
                justify="flex-end"
                className={classes.formControl}
              >
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  classes={{ containedPrimary: classes.borderRadius }}
                  type="submit"
                >
                  Save
                </Button>
              </Grid> */}
              </form>
            </div>
          </Modal>
        </Box>
      ) : (
        <Box className={classes.noneIconMenu} />
      )}
      <Paper
        elevation={5}
        className={classes.customRadius}
        onBlur={() => setIsForcus(false)}
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
          <Typography variant="h6">Action</Typography>

          <SettingsIcon fontSize="small" className={classes.iconSetting} />
        </Grid>
        {!isForcus ? (
          <Grid
            onMouseLeave={() => setIsForcus(false)}
            onMouseDown={() => setIsForcus(true)}
            className={classes.unforcusBody}
          >
            {action ? (
              <Typography>{action.name}</Typography>
            ) : (
              <Typography style={{ color: 'rgba(138, 138, 138, 0.87)' }}>
                Select action
              </Typography>
            )}
          </Grid>
        ) : (
          <Grid
            onMouseDown={() => setIsForcus(true)}
            className={classes.forcusBody}
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
                  InputProps={{ ...params.InputProps, disableUnderline: true }}
                  className={classes.textField}
                />
              )}
            />
          </Grid>
        )}
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
