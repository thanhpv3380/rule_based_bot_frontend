import api from './authApi';

export async function getBots() {
  const response = await api({
    method: 'GET',
    url: `/bots`,
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
