import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
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
  const { app } = props;
  const forceUpdate: () => void = React.useState()[1].bind(null, {});
  const { workflowId } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const addNode = async (node: BaseNodeModel) => {
    node.setPosition(
      550 - app.getActiveDiagram().getOffsetX(),
      300 - app.getActiveDiagram().getOffsetY(),
    );
    const newNode = {
      type: node.getType(),
      position: {
        x: 550,
        y: 300,
      },
      workflow: workflowId,
    };
    const data = await apis.node.createNode({ ...newNode });
    if (data && data.status) {
      node.id = data.result.node.id;
      props.app.getDiagramEngine().getModel().addNode(node);
      forceUpdate();
    } else {
      enqueueSnackbar((data && data.message) || 'Create node failed', {
        variant: 'error',
      });
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
      const linkTargets = el.getPort('in').getLinks();
      let parent = Object.keys(linkTargets).map((el) => {
        const nodeEle: any = linkTargets[el].getSourcePort().getParent();
        return {
          node: nodeEle.id,
          type: nodeEle.getType(),
        };
      });
      const linkSources = el.getPort('out').getLinks();
      const children = Object.keys(linkSources).map((el) => {
        const nodeEle: any = linkSources[el].getTargetPort().getParent();
        return {
          node: nodeEle.id,
          type: nodeEle.getType(),
        };
      });

      switch (el.getType()) {
        case 'START':
          return {
            id: el.getID(),
            type: el.getType(),
            children,
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
            parent,
            children,
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
            parent,
            children,
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
            parent,
            children,
            position: {
              x: el.getPosition().x,
              y: el.getPosition().y,
            },
          };
      }
    });

    const newWorkflow = {
      nodes: newNodes,
      offsetX: props.app.getActiveDiagram().getOffsetX(),
      offsetY: props.app.getActiveDiagram().getOffsetY(),
      zoom: props.app.getActiveDiagram().getZoomLevel(),
    };
    const data = await apis.workflow.updateWorkflow(workflowId, newWorkflow);
<<<<<<< HEAD
=======

>>>>>>> 22917bcf47079c4448c6c9f8459b2d9ae28b854a
    if (data && data.status) {
      enqueueSnackbar('Update workflow success', {
        variant: 'success',
      });
    } else {
      enqueueSnackbar('Update workflow failed', {
        variant: 'error',
      });
    }
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
