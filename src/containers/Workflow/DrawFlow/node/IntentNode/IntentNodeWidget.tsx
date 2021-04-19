import * as React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PortWidget } from '@projectstorm/react-diagrams-core';
import { Action, InputType } from '@projectstorm/react-canvas-core';
import {
  Box,
  TextField,
  Paper,
  Typography,
  Grid,
  Divider,
} from '@material-ui/core';
import {
  MoreVert as MoreVertIcon,
  Edit as Editcon,
  DeleteOutline as DeleteOutlineIcon,
  FileCopy as FileCopyIcon,
  RecordVoiceOver as RecordVoiceOverIcon,
} from '@material-ui/icons';
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
  const [isHover, setIsHover] = useState(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [actionMouseWheel, setActionMouseWheel] = useState<Action>();
  const [intent, setIntent] = useState<IntentsResponse>();
  const [intents, setIntents] = useState<IntentsResponse[]>();

  const fetchIntents = async () => {
    const data: DataResponse = await apis.intent.getIntents();
    if (data.status) {
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
            console.log('remove');
            const data = await apis.workflow.removeNode(
              workflowId,
              (model as BaseNodeModel).id,
            );
            if (data.status) {
              model.remove();
              engine.repaintCanvas();
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

  return (
    <Box
      className={classes.container}
      onMouseOver={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {isHover ? (
        <Box className={classes.iconMenu}>
          <Editcon
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

      <Paper style={{ borderRadius: 10 }}>
        <PortWidget
          engine={props.engine}
          port={props.node.getPort('in')}
        ></PortWidget>
        <Grid container justify="center" className={classes.header}>
          <RecordVoiceOverIcon className={classes.headerIcon} />
          <Typography variant="h6">Intent</Typography>
        </Grid>
        <Autocomplete
          className={classes.autoComplete}
          size="small"
          value={intent || null}
          options={intents}
          onChange={(e: React.ChangeEvent<{}>, value: any, reason: string) => {
            node.itemId = (value && value.id) || null;
            setIntent(value);
          }}
          getOptionSelected={(option, value) => option.id === value.id}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField
              {...params}
              className={classes.textField}
              placeholder="Search intent"
            />
          )}
        />
        <Grid container alignItems="center" justify="center">
          <PortWidget engine={props.engine} port={props.node.getPort('out')}>
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
