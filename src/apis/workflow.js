import api from './authApi';

export async function getWorkflows() {
  const response = await api({
    method: 'GET',
    url: '/workflows',
  });
  return response;
}

export async function getWorkflowById(id) {
  const response = await api({
    method: 'GET',
    url: `/workflows/${id}`,
  });
  return response;
}

export async function createWorkflow(workflow) {
  const response = await api({
    method: 'POST',
    url: '/workflows',
    data: workflow,
  });
  return response;
}

export async function updateWorkflow(id, workflow) {
  const response = await api({
    method: 'PUT',
    url: `/workflows/${id}`,
    data: workflow,
  });
  return response;
}

export async function deleteWorkflow(id) {
  const response = await api({
    method: 'DELETE',
    url: `/workflows/${id}`,
  });
  return response;
}

export async function addNode(id, node) {
  const response = await api({
    method: 'PUT',
    url: `/workflows/addNode/${id}`,
    data: { node },
  });
  return response;
}

export async function removeNode(id, nodeId, type) {
  const response = await api({
    method: 'PUT',
    url: `/workflows/removeNode/${id}`,
    data: { nodeId, type },
  });
  return response;
}
