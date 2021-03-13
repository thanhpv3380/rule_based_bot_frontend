import api from './authApi';

export async function getGroupAndItems({ keyword }) {
  const response = await api({
    method: 'POST',
    url: '/groupIntents/getGroupAndItems',
    data: { keyword: keyword || '' },
  });
  return response;
}

export async function getGroupIntent(id) {
  const response = await api({
    method: 'GET',
    url: `/groupIntents/${id}`,
  });
  return response;
}

export async function createGroupIntent(groupIntent) {
  const response = await api({
    method: 'POST',
    url: `/groupIntents`,
    data: groupIntent,
  });
  return response;
}

export async function updateGroupIntent(id, groupIntent) {
  const response = await api({
    method: 'PUT',
    url: `/groupIntents/${id}`,
    data: groupIntent,
  });
  return response;
}

export async function deleteGroupIntent(id) {
  const response = await api({
    method: 'DELETE',
    url: `/groupIntents/${id}`,
  });
  return response;
}
