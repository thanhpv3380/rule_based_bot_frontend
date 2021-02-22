import api from './authApi';

export async function getbots(name) {
  const response = await api({
    method: 'GET',
    url: `/bots?name=${name}`,
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

export async function createBot(Bot) {
  const response = await api({
    method: 'POST',
    url: '/bots',
    data: Bot,
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
