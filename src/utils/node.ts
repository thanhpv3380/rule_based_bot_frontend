import nodeConstant from '../constants/node';
import { IntentNodeModel, BaseNodeModel, ConditionNodeModel, ActionNodeModel } from '../containers/Workflow/DrawFlow/node';
import { AdvancedDiagramEngine } from '../containers/Workflow/DrawFlow/AdvancedDiagramEngine';

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
      ((typeConnect === nodeConstant.CONNECT_ONE_MANY && el !== nodeName) ||
        typeConnect === nodeConstant.CONNECT_ONE_ONE) &&
      listCountNode[el] > 0,
  );
  if (status) return false;
  return true;
}

export function checkAllowConnect(
  nodeSource: BaseNodeModel,
  nodeTarget: BaseNodeModel,
): Boolean {
  // count node has connected to Source Node
  const nodesConnSource = {};
  const listLinkSourceNode = nodeSource.getArrayLinkByPortType('out');

  console.log(listLinkSourceNode);
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

  if (nodeTarget instanceof IntentNodeModel) {
    let typeConnect = nodeConstant.CONNECT_ONE_MANY;
    if (
      nodeSource instanceof IntentNodeModel ||
      nodeSource instanceof ConditionNodeModel
    )
      typeConnect = nodeConstant.CONNECT_NONE;
    return checkHasNodeConnected(
      nodeConstant.INTENT,
      nodesConnSource,
      typeConnect,
    );
  }

  if (nodeTarget instanceof ActionNodeModel) {
    let typeConnect = nodeConstant.CONNECT_ONE_ONE;
    return checkHasNodeConnected(
      nodeConstant.ACTION,
      nodesConnSource,
      typeConnect,
    );
  }

  if (nodeTarget instanceof ConditionNodeModel) {
    let typeConnect = nodeConstant.CONNECT_ONE_MANY;
    return checkHasNodeConnected(
      nodeConstant.CONDITION,
      nodesConnSource,
      typeConnect,
    );
  }
  return true;
}

export function checkMutualNodeId(
  sourceNode: BaseNodeModel,
  targetNode: BaseNodeModel,
): Boolean {
  const listLinkOutSourceNode = sourceNode.getArrayLinkIdByPortType('out');
  const listLinkInTargetNode = targetNode.getArrayLinkIdByPortType('in');

  const mutualNodeId = listLinkInTargetNode.find(
    (el) => listLinkOutSourceNode.indexOf(el) >= 0,
  );

  return mutualNodeId ? true : false;
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