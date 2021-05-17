import api from './authApi';

export async function getPermissionsByBot() {
  const response = await api({
    method: 'GET',
    url: '/permissions',
  });
  return response;
}

export async function createPermission(data) {
  const response = await api({
    method: 'POST',
    url: '/permissions',
    data,
  });
  return response;
}

export async function getPermissionsById(id) {
  const response = await api({
    method: 'GET',
    url: `/permissions/${id}`,
  });
  return response;
}

export async function deletePermission(id) {
  const response = await api({
    method: 'DELETE',
    url: `/permissions/${id}`,
  });
  return response;
}
