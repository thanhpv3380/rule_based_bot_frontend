import api from './authApi';

export async function getNodeById(id) {
  const response = await api({
    method: 'GET',
    url: `/nodes/${id}`,
  });
  return response;
}

export async function createNode(node) {
  const response = await api({
    method: 'POST',
    url: `/nodes`,
    data: node,
  });
  return response;
}

export async function updateNode(id, node) {
  const response = await api({
    method: 'PUT',
    url: `/nodes/${id}`,
    data: node,
  });
  return response;
}

export async function deleteNode(workflowId, nodeId) {
  const response = await api({
    method: 'DELETE',
    url: `/nodes/${nodeId}/workflow/${workflowId}`,
  });
  return response;
}

export async function getParameters(nodes) {
  const response = await api({
    method: 'POST',
    url: `/nodes/getParameters`,
    data: { nodes },
  });
  return response;
}
