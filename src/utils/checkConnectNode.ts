import { ActionNodeModel, ConditionNodeModel, IntentNodeModel } from '../containers/Workflow/DrawFlow/node';

function checkHasNodeConnected(
  nodeName: string,
  listCountNode: any,
  typeConnect: Number,
) {
  if (typeConnect === 0) return false;
  const listNode = [
    'IntentNodeModel',
    'ActionNodeModel',
    'ConditionNodeModel',
  ];
  const status = listNode.find(
    (el) =>
      ((typeConnect === 2 && el !== nodeName) || typeConnect === 1) &&
      listCountNode[el] > 0,
  );
  if (status) return false;
  return true;
}

export function checkAllowConnect(nodeSource: any, nodeTarget: any, listLinkSourceNode: any) {
  // count node has connected to Source Node
  const nodesConnSource = {};
  console.log(listLinkSourceNode);
  Object.keys(listLinkSourceNode).forEach((el: any) => {
    console.log(listLinkSourceNode[el]);
    const node = listLinkSourceNode[el]?.getTargetPort()?.getParent();

    if (node) {
      if (node instanceof IntentNodeModel) {
        nodesConnSource['IntentNodeModel'] =
          nodesConnSource['IntentNodeModel'] + 1 || 1;
      } else if (node instanceof ActionNodeModel) {
        nodesConnSource['ActionNodeModel'] =
          nodesConnSource['ActionNodeModel'] + 1 || 1;
      } else if (node instanceof ConditionNodeModel) {
        nodesConnSource['ConditionNodeModel'] =
          nodesConnSource['ConditionNodeModel'] + 1 || 1;
      }
    }
  });

  console.log(nodesConnSource);

  // typeConnect: 0 - can't conn, 1 - conn (1,1), 2 - conn (1-n)
  if (nodeTarget instanceof IntentNodeModel) {
    let typeConnect = 2;
    if (
      nodeSource instanceof IntentNodeModel ||
      nodeSource instanceof ConditionNodeModel
    )
      typeConnect = 0;
    return checkHasNodeConnected(
      'IntentNodeModel',
      nodesConnSource,
      typeConnect,
    );
  }

  if (nodeTarget instanceof ActionNodeModel) {
    let typeConnect = 1;
    console.log('action check');
    return checkHasNodeConnected(
      'ActionNodeModel',
      nodesConnSource,
      typeConnect,
    );
  }

  if (nodeTarget instanceof ConditionNodeModel) {
    let typeConnect = 2;
    return checkHasNodeConnected(
      'ConditionNodeModel',
      nodesConnSource,
      typeConnect,
    );
  }

  return true;
}