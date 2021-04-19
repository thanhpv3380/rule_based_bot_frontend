import api from './authApi';

export async function getWorkflows() {
  const response = await api({
    method: 'GET',
    url: '/workflows',
  });
  return response;
}

export async function getWorkflow(id) {
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
