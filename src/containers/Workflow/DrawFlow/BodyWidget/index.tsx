import * as React from 'react';

import { CanvasWidget } from '@projectstorm/react-canvas-core';
import { Application } from '../Application';
import DemoCanvasWidget from './DemoCanvasWidget/index';

import { IntentNodeModel } from '../node/IntentNode/IntentNodeModel';
import { ConditionNodeModel } from '../node/ConditionNode/ConditionNodeModel';
import { ActionNodeModel } from '../node/ActionNode/ActionNodeModel';

import { Box, Drawer } from '@material-ui/core';
import {
  RecordVoiceOver as RecordVoiceOverIcon,
  Sms as SmsIcon,
  Close as CloseIcon,
  DeviceHubSharp as DeviceHubSharpIcon,
} from '@material-ui/icons';
import useStyles from './index.style';

export interface BodyWidgetProps {
  app: Application;
}

const BodyWidget = (props: BodyWidgetProps) => {
  const classes = useStyles();
  const forceUpdate: () => void = React.useState()[1].bind(null, {});

  const addNode = (node) => {
    node.setPosition(550, 300);
    props.app.getDiagramEngine().getModel().addNode(node);
    forceUpdate();
  };

  const handleAddIntent = (event) => {
    var node: IntentNodeModel = new IntentNodeModel();
    addNode(node);
  };
  const handleAddCondition = () => {
    var node: ConditionNodeModel = new ConditionNodeModel();
    addNode(node);
  };

  const handleAddAction = () => {
    var node: ActionNodeModel = new ActionNodeModel();
    addNode(node);
  };

  return (
    <div className={classes.container}>
      <div className={classes.sideBar}>
        <Box className={classes.sideBarItem}>
          <RecordVoiceOverIcon onClick={handleAddIntent} />
        </Box>
        <Box className={classes.sideBarItem}>
          <DeviceHubSharpIcon onClick={handleAddCondition} />
        </Box>
        <Box className={classes.sideBarItem}>
          <SmsIcon onClick={handleAddAction} />
        </Box>
        <Box className={classes.sideBarItem}>
          <CloseIcon />
        </Box>
      </div>

      <CanvasWidget
        className="diagram-container"
        engine={props.app.getDiagramEngine()}
      />
    </div>
  );
};

export default BodyWidget;
