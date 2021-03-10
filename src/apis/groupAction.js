import api from './authApi';

export async function getGroupActions() {
  const response = await api({
    method: 'GET',
    url: '/groupActions',
  });
  return response;
}

export async function getGroupAndItems({ keyword }) {
  const response = await api({
    method: 'POST',
    url: '/groupActions/getGroupAndItems',
    data: { keyword },
  });
  return response;
}

export async function getGroupAction(id) {
  const response = await api({
    method: 'GET',
    url: `/groupActions/${id}`,
  });
  return response;
}

export async function createGroupAction(groupAction) {
  const response = await api({
    method: 'POST',
    url: `/groupActions`,
    data: groupAction,
  });
  return response;
}

export async function updateGroupAction(id, groupAction) {
  const response = await api({
    method: 'PUT',
    url: `/groupActions/${id}`,
    data: groupAction,
  });
  return response;
}

export async function deleteGroupAction(id) {
  const response = await api({
    method: 'DELETE',
    url: `/groupActions/${id}`,
  });
  return response;
}
