import api from './authApi';

export async function getGroupAndItems(keyword) {
  const response = await api({
    method: 'POST',
    url: '/groupEntities/getGroupAndItems',
    data: { keyword: keyword || '' },
  });
  return response;
}

export async function getGroupEntity(id) {
  const response = await api({
    method: 'GET',
    url: `/groupEntities/${id}`,
  });
  return response;
}

export async function createGroupEntity(groupEntity) {
  const response = await api({
    method: 'POST',
    url: `/groupEntities`,
    data: groupEntity,
  });
  return response;
}

export async function updateGroupEntity(id, groupEntity) {
  const response = await api({
    method: 'PUT',
    url: `/groupEntities/${id}`,
    data: groupEntity,
  });
  return response;
}

export async function deleteGroupEntity(id) {
  const response = await api({
    method: 'DELETE',
    url: `/groupEntities/${id}`,
  });
  return response;
}
