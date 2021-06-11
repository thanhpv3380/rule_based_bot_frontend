import api from './authApi';

export async function getAllConversationByBotId() {
  const response = await api({
    method: 'GET',
    url: '/conversations',
  });
  return response;
}

export async function getConversationById(id) {
  const response = await api({
    method: 'GET',
    url: `/conversations/${id}`,
  });
  return response;
}
