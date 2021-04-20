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
} from './node';
import { AdvancedLinkModel, AdvancedPortModel } from './customLink';
import { NodeModel } from '@projectstorm/react-diagrams-core';
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
  parent: string[];
  position: {
    x: number;
    y: number;
  };
  type: 'START' | 'INTENT' | 'CONDITION' | 'ACTION';
}

const DrawFlow = () => {
  const { workflowId } = useParams();
  console.log(workflowId, 'workflow');

  const [application, setApplication] = React.useState<Application>(
    new Application(),
  );
  const drawNodes = (nodes: Node[], map: Map<string, NodeModel>) => {
    const listNodeCondition: Node[] = [];
    nodes.map(async (node: Node) => {
      let nodeDraw: NodeModel;
      switch (node.type) {
        case 'START':
          nodeDraw = new StartNodeModel({ id: node.id });

          nodeDraw.setPosition(node.position.x, node.position.y);
          application.getActiveDiagram().addNode(nodeDraw);
          map.set(node.id, nodeDraw);
          break;
        case 'INTENT':
          nodeDraw = new IntentNodeModel({
            id: node.id,
            itemId: (node.intent && node.intent.id) || null,
          });
          nodeDraw.setPosition(node.position.x, node.position.y);

          nodeDraw.setPosition(node.position.x, node.position.y);
          application.getActiveDiagram().addNode(nodeDraw);
          map.set(node.id, nodeDraw);
          break;
        case 'ACTION': {
          nodeDraw = new ActionNodeModel({
            id: node.id,
            itemId: (node.action && node.action.id) || null,
          });
          nodeDraw.setPosition(node.position.x, node.position.y);
          application.getActiveDiagram().addNode(nodeDraw);
          map.set(node.id, nodeDraw);
          break;
        }
        case 'CONDITION':
          listNodeCondition.push(node);
          break;
      }
    });

    listNodeCondition.map((el) => {
      let sourceNodeId: string;
      if (el.parent) {
        const sourceNode: IntentNodeModel = map.get(
          el.parent[0],
        ) as IntentNodeModel;
        sourceNodeId = sourceNode && sourceNode.itemId;
      }
      const nodeDraw = new ConditionNodeModel({
        id: el.id,
        itemId: (el.condition && el.condition.id) || null,
        intentId: sourceNodeId,
      });
      nodeDraw.setPosition(el.position.x, el.position.y);
      application.getActiveDiagram().addNode(nodeDraw);
      map.set(el.id, nodeDraw);
    });
  };

  const drawLinks = (nodes: Node[], map: Map<string, NodeModel>) => {
    nodes.map(async (node: Node) => {
      let nodeDraw: NodeModel = map.get(node.id);
      if (node.parent) {
        node.parent.map((nodeId: string) => {
          const parentNode = map.get(nodeId);
          const link = new AdvancedLinkModel();
          link.setSourcePort(parentNode.getPort('out') as AdvancedPortModel);
          link.setTargetPort(nodeDraw.getPort('in') as AdvancedPortModel);
          application.getActiveDiagram().addLink(link);
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
    application.getActiveDiagram().setOffsetX(ox);
    application.getActiveDiagram().setOffsetY(oy);
    application.getActiveDiagram().setZoomLevel(zoom);
    await drawNodes(nodes, map);
    await drawLinks(nodes, map);
    application.getDiagramEngine().repaintCanvas();
  };
  const fetchWorkFlow = async () => {
    console.log(workflowId, 'fetch');

    const data = await apis.workflow.getWorkFlowById(workflowId);
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
