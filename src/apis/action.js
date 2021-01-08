import api from './api';

export async function getActions() {
  const response = await api({
    method: 'GET',
    url: '/actions',
  });
  return response;
}

export async function getAction(id) {
  const response = await api({
    method: 'GET',
    url: `/actions/${id}`,
  });
  return response;
}

export async function createAction(action) {
  const response = await api({
    method: 'POST',
    url: '/actions',
    data: aAction,
  });
  return response;
}

export async function updateAction(id, action) {
  const response = await api({
    method: 'PUT',
    url: `/actions/${id}`,
    data: action,
  });
  return response;
}

export async function deleteAction(id) {
  const response = await api({
    method: 'DELETE',
    url: `/actions/${id}`,
  });
  return response;
}
