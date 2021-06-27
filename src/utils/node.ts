import nodeConstant from '../constants/node';
import { IntentNodeModel, BaseNodeModel, ConditionNodeModel, ActionNodeModel } from '../containers/Workflow/DrawFlow/node';
import { AdvancedDiagramEngine } from '../containers/Workflow/DrawFlow/AdvancedDiagramEngine';
import { ResponseCheckConnectNode } from './../containers/Workflow/DrawFlow/node/BaseNodeModel';

function checkHasNodeConnected(
  nodeName: string,
  listCountNode: any,
  typeConnect: Number,
): Boolean {
  if (typeConnect === nodeConstant.CONNECT_NONE) return false;
  const listNode = [
    nodeConstant.INTENT,
    nodeConstant.ACTION,
    nodeConstant.CONDITION,
  ];

  const status = listNode.find(
    (el) =>
    (((typeConnect === nodeConstant.CONNECT_ONE_MANY && el !== nodeName) ||
      typeConnect === nodeConstant.CONNECT_ONE_ONE) &&
      listCountNode[el] > 0)
  );
  if (status) return false;
  return true;
}

export function checkAllowConnect(
  nodeSource: BaseNodeModel,
  nodeTarget: BaseNodeModel,
): ResponseCheckConnectNode {
  // count node has connected to Source Node
  const nodesConnSource = {};
  const listLinkSourceNode = nodeSource.getArrayLinkByPortType('out');

  listLinkSourceNode.forEach((el: any) => {
    const node = el?.getTargetPort()?.getParent();

    if (node) {
      if (node instanceof IntentNodeModel) {
        nodesConnSource[nodeConstant.INTENT] =
          nodesConnSource[nodeConstant.INTENT] + 1 || 1;
      } else if (node instanceof ActionNodeModel) {
        nodesConnSource[nodeConstant.ACTION] =
          nodesConnSource[nodeConstant.ACTION] + 1 || 1;
      } else if (node instanceof ConditionNodeModel) {
        nodesConnSource[nodeConstant.CONDITION] =
          nodesConnSource[nodeConstant.CONDITION] + 1 || 1;
      }
    }
  });

  let message: String = 'a_node_only_connect_to_one_type_node';
  let status: Boolean = true;

  if (nodeTarget instanceof IntentNodeModel) {
    if (
      nodeSource instanceof IntentNodeModel ||
      nodeSource instanceof ConditionNodeModel
    ) {
      message = 'can\'t_connect_to_Intent_Node';
      message = (nodeSource instanceof IntentNodeModel ? 'intent_Node_' : 'condition_Node_') + message;
      status = false;

    } else {
      let typeConnect = nodeConstant.CONNECT_ONE_MANY;
      status = checkHasNodeConnected(
        nodeConstant.INTENT,
        nodesConnSource,
        typeConnect,
      );
    }
  }

  if (nodeTarget instanceof ActionNodeModel) {
    if (nodeTarget.getArrayLinkIdByPortType('in').length > 0) {
      message = 'this_action_node_only_connect_to_one_parent_node';
      status = false;
    } else {
      let typeConnect = nodeConstant.CONNECT_ONE_ONE;
      status = checkHasNodeConnected(
        nodeConstant.ACTION,
        nodesConnSource,
        typeConnect,
      )
    }
  }

  if (nodeTarget instanceof ConditionNodeModel) {
    if (nodeSource instanceof ConditionNodeModel) {
      message = 'condition_Node_can\'t_connect_to_Condition_Node';
      status = false;
    } else {
      let typeConnect = nodeConstant.CONNECT_ONE_MANY;
      status = checkHasNodeConnected(
        nodeConstant.CONDITION,
        nodesConnSource,
        typeConnect,
      );
    }
  }
  return { status, message: !status && message || null };
}

export function checkMutualNodeId(
  sourceNode: BaseNodeModel,
  targetNode: BaseNodeModel,
): ResponseCheckConnectNode {
  const listLinkOutSourceNode = sourceNode.getArrayLinkIdByPortType('out');
  const listLinkInTargetNode = targetNode.getArrayLinkIdByPortType('in');

  const mutualNodeId = listLinkInTargetNode.find(
    (el) => listLinkOutSourceNode.indexOf(el) >= 0,
  );

  return !mutualNodeId ? { status: true } : { status: false, message: 'this_node_has_connected' };
}

export function getRealPosition(engine: AdvancedDiagramEngine, positionX: number, positionY: number): { posX: number, posY: number } {
  const model = engine.getModel();
  const ox = model.getOffsetX();
  const oy = model.getOffsetY();
  const zoomLevel = model.getZoomLevel() / 100;
  const posX = (positionX - ox) / zoomLevel;
  const posY = (positionY - oy) / zoomLevel;
  return { posX, posY };
}