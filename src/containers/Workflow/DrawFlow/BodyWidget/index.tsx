import * as React from 'react';

import { CanvasWidget } from '@projectstorm/react-canvas-core';
import { Application } from '../Application';
import DemoCanvasWidget from './DemoCanvasWidget/index';

import { IntentNodeModel, ConditionNodeModel, ActionNodeModel } from '../node';

import { Box, Drawer } from '@material-ui/core';
import {
  RecordVoiceOver as RecordVoiceOverIcon,
  Sms as SmsIcon,
  Close as CloseIcon,
  DeviceHubSharp as DeviceHubSharpIcon,
  Save as SaveIcon,
} from '@material-ui/icons';
import useStyles from './index.style';
import { BaseNodeModel } from '../node/BaseNodeModel';
import apis from '../../../../apis';

export interface BodyWidgetProps {
  app: Application;
}

const BodyWidget = (props: BodyWidgetProps) => {
  const classes = useStyles();
  const forceUpdate: () => void = React.useState()[1].bind(null, {});

  const addNode = async (node: BaseNodeModel) => {
    node.setPosition(550, 300);
    const newNode = {
      type: node.getType(),
      position: {
        x: 550,
        y: 300,
      },
    };
    const data = await apis.workFlow.addNode(
      '60772243b8287d30f84e3f6a',
      newNode,
    );
    if (data.status) {
      node.id = data.result.node.id;
      props.app.getDiagramEngine().getModel().addNode(node);
      forceUpdate();
    } else {
      //Todo alert failed
    }
  };

  const handleAddIntent = (event: any) => {
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
  const handleSave = async () => {
    const nodes = props.app
      .getDiagramEngine()
      .getModel()
      .getNodes() as BaseNodeModel[];
    const newNodes = nodes.map((el: BaseNodeModel) => {
      const links = el.getPort('in').getLinks();
      let parent = [];
      for (var object in links) {
        parent.push(
          (links[object].getSourcePort().getParent() as BaseNodeModel).id,
        );
      }
      switch (el.getType()) {
        case 'START':
          return {
            id: el.id,
            type: el.getType(),
            parent: parent,
            position: {
              x: el.getPosition().x,
              y: el.getPosition().y,
            },
          };
        case 'INTENT':
          return {
            id: el.id,
            type: el.getType(),
            intent: el.itemId,
            parent: parent,
            position: {
              x: el.getPosition().x,
              y: el.getPosition().y,
            },
          };
        case 'ACTION':
          return {
            id: el.id,
            type: el.getType(),
            action: el.itemId,
            parent: parent,
            position: {
              x: el.getPosition().x,
              y: el.getPosition().y,
            },
          };
        case 'CONDITION':
          return {
            id: el.id,
            type: el.getType(),
            condition: el.itemId,
            parent: parent,
            position: {
              x: el.getPosition().x,
              y: el.getPosition().y,
            },
          };
      }
    });
    const data = await apis.workFlow.updateFlowDraw(
      '60772243b8287d30f84e3f6a',
      newNodes,
    );
    console.log(newNodes, 'result');
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
          <SaveIcon onClick={handleSave} />
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
