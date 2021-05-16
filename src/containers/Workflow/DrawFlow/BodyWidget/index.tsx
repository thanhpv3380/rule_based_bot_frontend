import * as React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import { Application } from '../Application';
import DemoCanvasWidget from './DemoCanvasWidget/index';

import { IntentNodeModel, ConditionNodeModel, ActionNodeModel } from '../node';

import { Box, Drawer, Tooltip, Button, IconButton } from '@material-ui/core';
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
import { ActionIcon, ConditionIcon, IntentIcon } from '../icon';
import { AdvancedDiagramEngine } from '../AdvancedDiagramEngine';
export interface BodyWidgetProps {
  app: Application;
}

const BodyWidget = (props: BodyWidgetProps) => {
  const { app } = props;
  const history = useHistory();
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { workflowId, id } = useParams();

  const forceUpdate: () => void = React.useState()[1].bind(null, {});

  const addNode = async (node: BaseNodeModel) => {
    node.setPosition(
      550 - app.getActiveDiagram().getOffsetX(),
      300 - app.getActiveDiagram().getOffsetY(),
    );
    const engine = app.getDiagramEngine() as AdvancedDiagramEngine;
    await node.create(engine, null, workflowId);
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

  const getChildren = (typePort, node, children) => {
    const linkSourcesPortRight = node.getPort(typePort).getLinks();
    Object.keys(linkSourcesPortRight).forEach((el) => {
      const nodeEle: any = linkSourcesPortRight[el].getTargetPort().getParent();
      children.push({
        node: nodeEle.id,
        type: nodeEle.getType(),
        typePort: typePort,
      });
    });
    return children;
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
      let children = [];
      children = getChildren('out-bottom', el, children);
      children = getChildren('out-right', el, children);
      children = getChildren('out-left', el, children);

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
          const actionNode = el as ActionNodeModel;
          return {
            id: el.id,
            type: el.getType(),
            action: el.itemId,
            actionAskAgain: {
              ...(el as ActionNodeModel).actionAskAgain,
            },
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
    console.log(newWorkflow);

    const data = await apis.workflow.updateWorkflow(workflowId, newWorkflow);
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

  const handleClose = () => {
    history.push(`/bot/${id}/workflows/detail/${workflowId}`);
  };

  return (
    <div className={classes.container}>
      <div className={classes.sideBar}>
        <Box className={classes.sideBarItem} onClick={handleAddIntent}>
          <IntentIcon className={classes.siderBarIcon} />
        </Box>
        <Box className={classes.sideBarItem} onClick={handleAddCondition}>
          <ConditionIcon className={classes.siderBarIcon} />
        </Box>
        <Box className={classes.sideBarItem} onClick={handleAddAction}>
          <ActionIcon className={classes.siderBarIcon} />
        </Box>
        <Box className={classes.sideBarItem} onClick={handleSave}>
          <Tooltip title="Save" aria-label="add" placement="right">
            <SaveIcon className={classes.siderBarIconSave} />
          </Tooltip>
        </Box>
        <Box className={classes.sideBarItem} onClick={handleClose}>
          <Tooltip title="Close" aria-label="add" placement="right">
            <CloseIcon />
          </Tooltip>
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
