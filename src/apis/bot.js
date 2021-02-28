import api from './authApi';
import { renderQueryAll } from '../utils/query';

export async function getBots(query) {
  const newQuery = renderQueryAll(query);
  const response = await api({
    method: 'GET',
    url: `/bots?${newQuery}`,
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
