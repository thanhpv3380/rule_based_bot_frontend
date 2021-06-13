import api from './authApi';

export async function getBots() {
  const response = await api({
    method: 'GET',
    url: `/bots`,
    params: {
      sort: 'createdAt_desc',
    },
  });
  return response;
}

export async function getBotById(id) {
  const response = await api({
    method: 'GET',
    url: `/bots/${id}`,
  });
  return response;
}

export async function getRoleInBot(id) {
  const response = await api({
    method: 'GET',
    url: `/bots/${id}/role`,
  });
  return response;
}

export async function addPermission(id, data) {
  const response = await api({
    method: 'PUT',
    url: `/bots/${id}/add-permission`,
    data,
  });
  return response;
}

export async function deletePermission(id, userId) {
  const response = await api({
    method: 'PUT',
    url: `/bots/${id}/delete-permission/${userId}`,
  });
  return response;
}

export async function createBot(bot) {
  const response = await api({
    method: 'POST',
    url: '/bots',
    data: bot,
  });
  return response;
}

export async function updateBot(id, Bot) {
  const response = await api({
    method: 'PUT',
    url: `/bots/${id}`,
    data: Bot,
  });
  return response;
}

export async function deleteBot(id) {
  const response = await api({
    method: 'DELETE',
    url: `/bots/${id}`,
  });
  return response;
}

export async function exportFile(id) {
  const response = await api({
    method: 'GET',
    url: `/bots/${id}/export-file`,
  });
  return response;
}

export async function importFile(id, file) {
  const formData = new FormData();
  formData.append('file', file);
  const response = await api({
    method: 'PUT',
    url: `/bots/${id}/import-file`,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
}
