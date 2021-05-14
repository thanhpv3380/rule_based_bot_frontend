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
import {
  DataResponse,
  ActionAskAgainResponse,
  ActionResponse,
} from './ActionAskAgainNodeWidget.type';
import apis from '../../../../../apis';
import { BaseNodeModel } from '../BaseNodeModel';
import { AdvancedDiagramEngine } from '../../AdvancedDiagramEngine';
import { ActionIcon } from '../../icon';
import textDefault from '../../../../../constants/textDefault';

export interface ActionAskAgainNodeWidgetProps {
  node: ActionAskAgainNodeModel;
  engine: AdvancedDiagramEngine;
}

const ActionAskAgainNodeNodeWidget = (props: ActionAskAgainNodeWidgetProps) => {
  const { node, engine } = props;
  const { workflowId } = useParams();
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [isHover, setIsHover] = useState(false);
  const [actionMouseWheel] = useState<Action>(
    engine.getActionEventBus().getActionsForType(InputType.MOUSE_WHEEL)[0],
  );
  const [
    actionAskAgain,
    setActionAskAgain,
  ] = useState<ActionAskAgainResponse>();
  const [actions, setActions] = useState<ActionResponse[]>();
  const [isFocus, setIsFocus] = useState<boolean>(false);

  const fetchActions = async () => {
    const data: DataResponse = await apis.action.getActions();
    if (data && data.status) {
      setActions(data.result.actions);
    }
  };

  useEffect(() => {
    fetchActions();
  }, []);

  const handleDeleteNode = async () => {
    const selectedEntities = engine.getModel().getSelectedEntities();
    if (selectedEntities.length > 0) {
      const confirm = window.confirm('Are you sure you want to delete?');

      if (confirm) {
        _.forEach(selectedEntities, async (model) => {
          // only delete items which are not locked
          if (!model.isLocked()) {
            model.remove();
            engine.repaintCanvas();
          } else {
            enqueueSnackbar('Delete node failed', {
              variant: 'error',
            });
          }
        });
        engine.repaintCanvas();
      }
    }
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
        <Grid container justify="center" className={classes.grid}>
          <ActionIcon
            backgroundColor="#ebe0f1"
            className={classes.iconHeader}
          />
          <Typography variant="h6">Action Ask Again</Typography>
        </Grid>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <div className={classes.content}>
            <form>
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
        </Box>
      </Paper>
    </Box>
  );
};

export default ActionAskAgainNodeNodeWidget;
