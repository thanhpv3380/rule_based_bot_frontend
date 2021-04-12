import * as React from "react";
import { DiagramEngine, PortWidget } from "@projectstorm/react-diagrams";
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
} from "@material-ui/core";
import {
  MoreVert as MoreVertIcon,
  Edit as Editcon,
  DeleteOutline as DeleteOutlineIcon,
  FileCopy as FileCopyIcon,
  RecordVoiceOver as RecordVoiceOverIcon,
  Sms as SmsIcon,
} from "@material-ui/icons";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { ActionNodeModel } from "./ActionNodeModel";
import * as _ from "lodash";

export interface ActionNodeWidgetProps {
  node: ActionNodeModel;
  engine: DiagramEngine;
}

const ActionNodeNodeWidget = (props) => {
  const [isHover, setIsHover] = React.useState(false);
  const [open, setOpen] = React.useState<boolean>(false);

  const handleDeleteNode = (engine) => {
    const selectedEntities = engine.getModel().getSelectedEntities();
    if (selectedEntities.length > 0) {
      const confirm = window.confirm("Are you sure you want to delete?");

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
      selectedEntities.getPosition().y + 20
    );
    props.engine.getModel().addNode(newNode);
    // engine.getModel().addNode(newNode);
    props.engine.repaintCanvas();
  };

  return (
    <Box
      style={{ width: 280, position: "relative" }}
      // style={{ borderRadius: 10 }}
      onMouseOver={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {isHover ? (
        <Paper style={{ width: 100, height: 24, marginBottom: 5 }}>
          <Box style={{ marginLeft: 4 }}>
            <Editcon
              style={{ cursor: "pointer" }}
              onClick={() => {
                setOpen(true);
                // props.engine
                //   .getActionEventBus()
                //   .deregisterAction(
                //     props.engine
                //       .getActionEventBus()
                //       .getActionsForType(InputType.MOUSE_WHEEL)[0]
                //   );
              }}
            />
            <DeleteOutlineIcon
              onClick={() => handleDeleteNode(props.engine)}
              style={{ cursor: "pointer" }}
            />
            <FileCopyIcon onClick={() => handleDuplicateNode(props.engine)} />
            <MoreVertIcon style={{ cursor: "pointer" }} />
          </Box>
        </Paper>
      ) : (
        <div style={{ width: 100, height: 24, marginBottom: 5 }} />
      )}
      {/* <RecordVoiceOverIcon
        style={{ position: "absolute", top: 45, left: 12 }}
      /> */}

      <Paper style={{ borderRadius: 10 }}>
        <PortWidget
          engine={props.engine}
          port={props.node.getPort("in")}
        ></PortWidget>
        <Grid container justify="center" style={{ paddingTop: 10 }}>
          <SmsIcon style={{ position: "relative", marginRight: 10 }} />
          <Typography>Action</Typography>
        </Grid>

        <Autocomplete
          style={{
            margin: "0px 20px",
          }}
          size="small"
          options={[]}
          getOptionSelected={(option, value) => option.id === value.id}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField
              {...params}
              style={{
                margin: "10px 0px 5px 0px",
              }}
            />
          )}
        />
        <Grid container alignItems="center" justify="center">
          <PortWidget engine={props.engine} port={props.node.getPort("out")}>
            <div className="circle-port" />
          </PortWidget>
        </Grid>
      </Paper>

      {/* <IntentNodeDetail open={open} setOpen={setOpen} /> */}
    </Box>
  );
};

export default ActionNodeNodeWidget;
