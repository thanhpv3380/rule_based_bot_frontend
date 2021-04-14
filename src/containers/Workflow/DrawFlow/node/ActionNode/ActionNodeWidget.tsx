import * as React from 'react';
import { DiagramEngine, PortWidget } from '@projectstorm/react-diagrams';
import {
  Button,
  Box,
  TextField,
  Paper,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Grid,
} from '@material-ui/core';
import {
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  DeleteOutline as DeleteOutlineIcon,
  FileCopy as FileCopyIcon,
  RecordVoiceOver as RecordVoiceOverIcon,
  Sms as SmsIcon,
} from '@material-ui/icons';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { ActionNodeModel } from './ActionNodeModel';
import ActionNodeDetail from './NodeDetail/index';
import * as _ from 'lodash';
import useStyles from './index.style';
import { InputType } from '@projectstorm/react-canvas-core';

export interface ActionNodeWidgetProps {
  node: ActionNodeModel;
  engine: DiagramEngine;
}

const ActionNodeNodeWidget = (props: ActionNodeWidgetProps) => {
  const classes = useStyles();
  const [isHover, setIsHover] = React.useState(false);
  const [open, setOpen] = React.useState<boolean>(false);

  const handleDeleteNode = (engine) => {
    const selectedEntities = engine.getModel().getSelectedEntities();
    if (selectedEntities.length > 0) {
      const confirm = window.confirm('Are you sure you want to delete?');

      if (confirm) {
        _.forEach(selectedEntities, (model) => {
          // only delete items which are not locked
          if (!model.isLocked()) {
            model.remove();
          }
        });
        engine.repaintCanvas();
      }
    }
  };

  const handleDuplicateNode = (engine) => {
    const selectedEntities = props.engine
      .getModel()
      .getSelectedEntities()[0] as ActionNodeModel;

    const newNode = new ActionNodeModel();
    newNode.setPosition(
      selectedEntities.getPosition().x + 20,
      selectedEntities.getPosition().y + 20,
    );
    props.engine.getModel().addNode(newNode);
    // engine.getModel().addNode(newNode);
    props.engine.repaintCanvas();
  };

  return (
    <Box
      className={classes.boxContainer}
      onMouseOver={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {isHover ? (
        <Paper className={classes.customPaper}>
          <Box className={classes.customBox}>
            <EditIcon
              className={classes.customCursor}
              onClick={() => {
                setOpen(true);
                // props.engine
                //   .getActionEventBus()
                //   .deregisterAction(
                //     props.engine
                //       .getActionEventBus()
                //       .getActionsForType(InputType.MOUSE_WHEEL)[0],
                //   );
              }}
            />
            <DeleteOutlineIcon
              className={classes.customCursor}
              onClick={() => handleDeleteNode(props.engine)}
            />
            <FileCopyIcon onClick={() => handleDuplicateNode(props.engine)} />
            <MoreVertIcon className={classes.customCursor} />
          </Box>
        </Paper>
      ) : (
        <div className={classes.customPaper} />
      )}
      <Paper className={classes.customRadius}>
        <PortWidget
          engine={props.engine}
          port={props.node.getPort('in')}
        ></PortWidget>
        <Grid container justify="center" className={classes.grid}>
          <SmsIcon className={classes.customIcon} />
          <Typography>Action</Typography>
        </Grid>

        <Autocomplete
          className={classes.autoComplete}
          size="small"
          options={[]}
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
      <ActionNodeDetail open={open} setOpen={setOpen} />
    </Box>
  );
};

export default ActionNodeNodeWidget;
