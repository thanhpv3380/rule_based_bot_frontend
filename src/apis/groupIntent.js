import api from './authApi';

export async function getGroupIntents(keyword) {
  const response = await api({
    method: 'GET',
    url: `/groupIntents?keyword=${keyword}`,
  });
  return response;
}

export async function search(keyword) {
  const response = await api({
    method: 'GET',
    url: `/groupIntents/search?keyword=${keyword}`,
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

export async function createGroupIntent(name) {
  const response = await api({
    method: 'POST',
    url: `/groupIntents`,
    data: { name },
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
