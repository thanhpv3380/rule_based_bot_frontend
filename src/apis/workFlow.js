import api from './authApi';

export async function getWorkFlowById(id) {
  const response = await api({
    method: 'GET',
    url: `/workFlows/${id}`,
  });
  return response;
}

export async function updateWorkFlow(id, nodes) {
  const response = await api({
    method: 'PUT',
    url: `/workFlows/${id}`,
    data: nodes,
  });
  return response;
}

export async function updateFlowDraw(id, nodes) {
  const response = await api({
    method: 'PUT',
    url: `/workFlows/flowDraw/${id}`,
    data: { nodes },
  });
  return response;
}

export async function addNode(id, node) {
  const response = await api({
    method: 'PUT',
    url: `/workFlows/addNode/${id}`,
    data: { node },
  });
  return response;
}

export async function removeNode(id, nodeId) {
  const response = await api({
    method: 'PUT',
    url: `/workFlows/removeNode/${id}`,
    data: { nodeId },
  });
  return response;
}
