import * as React from 'react';
import { useParams } from 'react-router-dom';
import BodyWidget from './BodyWidget/index';
import { Application } from './Application';
import apis from '../../../apis';
import {
  StartNodeModel,
  IntentNodeModel,
  ActionNodeModel,
  ConditionNodeModel,
  ActionAskAgainNodeModel,
} from './node';
import { AdvancedLinkModel, AdvancedPortModel } from './customLink';
import { NodeModel } from '@projectstorm/react-diagrams-core';
import { NodeConnect } from './node/Node.types';

export interface Node {
  id: string;
  action: {
    id: string;
    name: string;
  };
  condition: {
    id: string;
    name: string;
  };
  intent: {
    id: string;
    name: string;
  };
  actionAskAgain: {
    numberOfLoop: number;
    actionFail: string;
    actionAskAgain: string;
  };
  parent: NodeConnect[];
  children: NodeConnect[];
  position: {
    x: number;
    y: number;
  };
  type: 'START' | 'INTENT' | 'CONDITION' | 'ACTION';
  workflow: string;
  bot: string;
}

const DrawFlow = () => {
  const { workflowId } = useParams();
  console.log(workflowId, 'workflow');

  const [application, setApplication] = React.useState<Application>(
    new Application(),
  );
  const drawNodes = async (nodes: Node[], map: Map<string, NodeModel>) => {
    await nodes.map(async (node: Node) => {
      let nodeDraw: NodeModel;
      switch (node.type) {
        case 'START':
          nodeDraw = new StartNodeModel({ id: node.id });
          nodeDraw.setPosition(node.position.x, node.position.y);
          break;
        case 'INTENT':
          nodeDraw = new IntentNodeModel({
            id: node.id,
            itemId: (node.intent && node.intent.id) || null,
            nodeInfo: node.intent || null,
          });
          break;
        case 'ACTION': {
          nodeDraw = new ActionNodeModel({
            id: node.id,
            itemId: (node.action && node.action.id) || null,
            nodeInfo: node.action || null,
            actionAskAgain: node.actionAskAgain || null,
          });
          break;
        }
        case 'CONDITION':
          nodeDraw = new ConditionNodeModel({
            id: node.id,
            itemId: (node.condition && node.condition.id) || null,
            nodeInfo: node.condition || null,
          });
          break;
      }
      nodeDraw.setPosition(node.position.x || 0, node.position.y || 0);
      application.getActiveDiagram().addNode(nodeDraw);
      map.set(node.id, nodeDraw);
    });
  };

  const drawLinks = async (nodes: Node[], map: Map<string, NodeModel>) => {
    await nodes.map(async (node: Node) => {
      let nodeDraw: NodeModel = map.get(node.id);
      if (node.children) {
        node.children.map((el: any) => {
          const childrenNode = map.get(el.node);
          const link = new AdvancedLinkModel();
          if (childrenNode) {
            link.setSourcePort(
              nodeDraw.getPort(el.typePort) as AdvancedPortModel,
            );
            link.setTargetPort(childrenNode.getPort('in') as AdvancedPortModel);
            application.getActiveDiagram().addLink(link);
          }
        });
      }
    });
  };
  const drawFlow = async (
    nodes: Node[],
    ox: number,
    oy: number,
    zoom: number,
  ) => {
    const map: Map<string, NodeModel> = new Map();
    application.getActiveDiagram().setOffsetX(ox || 0);
    application.getActiveDiagram().setOffsetY(oy || 0);
    application.getActiveDiagram().setZoomLevel(zoom || 100);
    await drawNodes(nodes, map);
    await drawLinks(nodes, map);
    application.getDiagramEngine().repaintCanvas();
  };
  const fetchWorkFlow = async () => {
    const data = await apis.workflow.getWorkflowById(workflowId);
    if (data.status) {
      const { nodes, offsetX, offsetY, zoom } = data.result.workflow;
      drawFlow(nodes as Node[], offsetX, offsetY, zoom);
    }
  };

  React.useEffect(() => {
    fetchWorkFlow();
  }, [application]);
  return <BodyWidget app={application} />;
};

export default DrawFlow;
