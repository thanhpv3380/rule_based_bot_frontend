import api from './authApi';

export async function getActions(data) {
  const response = await api({
    method: 'GET',
    url: '/actions',
    params: {
      fields: data && data.fields,
      sort: data && data.sort,
    },
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
    data: action,
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
