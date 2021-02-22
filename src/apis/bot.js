import api from './api';

export async function getbots(name, accessToken) {
    const response = await api({
      method: 'GET',
      url: `/bots?name=${name}`,
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response;
  }
  
  export async function getBotById(id, accessToken) {
    const response = await api({
      method: 'GET',
      url: `/bots/${id}`,
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response;
  }
  
  export async function createBot(Bot, accessToken) {
    const response = await api({
      method: 'POST',
      url: '/bots',
      data: Bot,
      headers: { Authorization: `Bearer ${accessToken}` },
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