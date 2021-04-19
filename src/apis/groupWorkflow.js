import api from './authApi';

export async function getGroupAndItems(keyword) {
  const response = await api({
    method: 'POST',
    url: '/groupWorkflows/getGroupAndItems',
    data: { keyword: keyword || '' },
  });
  return response;
}

export async function getGroupWorkflow(id) {
  const response = await api({
    method: 'GET',
    url: `/groupWorkflows/${id}`,
  });
  return response;
}

export async function createGroupWorkflow(groupWorkflow) {
  const response = await api({
    method: 'POST',
    url: `/groupWorkflows`,
    data: groupWorkflow,
  });
  return response;
}

export async function updateGroupWorkflow(id, groupWorkflow) {
  const response = await api({
    method: 'PUT',
    url: `/groupWorkflows/${id}`,
    data: groupWorkflow,
  });
  return response;
}

export async function deleteGroupWorkflow(id) {
  const response = await api({
    method: 'DELETE',
    url: `/groupWorkflows/${id}`,
  });
  return response;
}
