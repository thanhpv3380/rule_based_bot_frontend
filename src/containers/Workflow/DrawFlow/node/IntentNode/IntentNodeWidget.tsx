import * as React from 'react';
import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useParams } from 'react-router-dom';
import { PortWidget } from '@projectstorm/react-diagrams-core';
import {
  Action,
  DragCanvasState,
  InputType,
  StateMachine,
} from '@projectstorm/react-canvas-core';
import {
  Box,
  TextField,
  Paper,
  Typography,
  Grid,
  Divider,
  InputBase,
} from '@material-ui/core';
import {
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  DeleteOutline as DeleteOutlineIcon,
  FileCopy as FileCopyIcon,
  RecordVoiceOver as RecordVoiceOverIcon,
} from '@material-ui/icons';
import { IntentIcon } from '../../icon';
import useStyle from './intentNodeWidget.style';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { IntentNodeModel } from './';
import * as _ from 'lodash';
import IntentNodeDetail from './NodeDetail';
import { AdvancedDiagramEngine } from '../../AdvancedDiagramEngine';
import apis from '../../../../../apis';
import { Intent, IntentsResponse, DataResponse } from './intentNodeWidget.type';
import { BaseNodeModel } from '../BaseNodeModel';

export interface IntentNodeWidgetProps {
  node: IntentNodeModel;
  engine: AdvancedDiagramEngine;
}

export interface IntentNodeWidgetState {
  isHover: boolean;
}

const IntentNodeWidget = (props: IntentNodeWidgetProps) => {
  const { node, engine } = props;
  const { workflowId } = useParams();
  const classes = useStyle();
  const { enqueueSnackbar } = useSnackbar();
  const [isHover, setIsHover] = useState(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [actionMouseWheel] = useState<Action>(
    engine.getActionEventBus().getActionsForType(InputType.MOUSE_WHEEL)[0],
  );
  const [intent, setIntent] = useState<IntentsResponse>();
  const [intents, setIntents] = useState<IntentsResponse[]>([]);
  const [isForcus, setIsForcus] = useState<boolean>(false);

  const fetchIntents = async () => {
    const data: DataResponse = await apis.intent.getIntents();
    if (data && data.status) {
      setIntents(data.result);
      if (node.itemId) {
        setIntent(data.result.find((el) => el.id === node.itemId));
      }
    }
  };

  useEffect(() => {
    fetchIntents();
  }, []);

  const handleOpenEdit = () => {
    setOpenEdit(true);

    // engine.getActionEventBus().deregisterAction(actionMove);
    engine.getActionEventBus().deregisterAction(actionMouseWheel);
    engine.repaintCanvas();
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setIsHover(false);
    // engine.getActionEventBus().registerAction(actionMove);
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
            console.log('remove');
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
        // engine.repaintCanvas();
      }
    }
  };

  const handleDuplicateNode = () => {
    const selectedEntities = engine
      .getModel()
      .getSelectedEntities()[0] as IntentNodeModel;

    const newNode = new IntentNodeModel();
    newNode.setPosition(
      selectedEntities.getPosition().x + 20,
      selectedEntities.getPosition().y + 20,
    );
    // props.engine.getModel().addNode(newNode);
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

  const handleMouseEnterItem = (e: any) => {
    // e.target.style.border = '2px solid #88beee';
  };
  const handleMouseLeaveItem = (e: any) => {
    // e.target.style.border = '2px solid rgb(224 224 224)';
  };
  return (
    <Box onMouseLeave={() => setIsHover(false)} className={classes.container}>
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
        onMouseOver={() => setIsHover(true)}
        className={classes.root}
      >
        <PortWidget
          engine={props.engine}
          port={props.node.getPort('in')}
        ></PortWidget>
        <Grid container justify="center" className={classes.header}>
          <IntentIcon
            className={classes.headerIcon}
            style={{ width: '2em', height: '2em' }}
          />
          <Typography variant="h6">Intent</Typography>
        </Grid>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <PortWidget
            engine={props.engine}
            port={props.node.getPort('out-left')}
          >
            <div className="circle-port" />
          </PortWidget>
          {!isForcus ? (
            <Grid
              onMouseLeave={() => setIsForcus(false)}
              onMouseDown={() => setIsForcus(true)}
              className={classes.unforcusBody}
            >
              {intent ? (
                <Typography>{intent.name}</Typography>
              ) : (
                <Typography style={{ color: 'rgba(138, 138, 138, 0.87)' }}>
                  Select intent
                </Typography>
              )}
            </Grid>
          ) : (
            <Grid
              onBlur={() => setIsForcus(false)}
              onMouseDown={() => setIsForcus(true)}
              className={classes.forcusBody}
            >
              <Autocomplete
                className={classes.autoComplete}
                size="small"
                value={intent || null}
                options={intents}
                onChange={(
                  e: React.ChangeEvent<{}>,
                  value: any,
                  reason: string,
                ) => {
                  node.itemId = (value && value.id) || null;
                  node.nodeInfo = value;
                  setIntent(value);
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
                    placeholder="Select intent"
                  />
                )}
              />
            </Grid>
          )}
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

      <IntentNodeDetail
        open={openEdit}
        handleCloseEdit={handleCloseEdit}
        intentId={intent?.id}
      />
    </Box>
  );
};

export default IntentNodeWidget;
