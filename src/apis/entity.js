import api from './authApi';

export async function getEntities() {
  const response = await api({
    method: 'GET',
    url: '/entities',
  });
  return response;
}

export async function getEntity(id) {
  const response = await api({
    method: 'GET',
    url: `/entities/${id}`,
  });
  return response;
}

export async function createEntity(entity) {
  const response = await api({
    method: 'POST',
    url: '/entities',
    data: entity,
  });
  return response;
}

export async function updateEntity(id, entity) {
  const response = await api({
    method: 'PUT',
    url: `/entities/${id}`,
    data: entity,
  });
  return response;
}

export async function deleteEntity(id) {
  const response = await api({
    method: 'DELETE',
    url: `/entities/${id}`,
  });
  return response;
}
