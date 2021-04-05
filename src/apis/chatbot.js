import api from './authApi';

export async function sendMessage(usersay) {
  const response = await api({
    method: 'GET',
    url: `/user/intent/getAction?usersay=${usersay}`,
  });
  return response;
}
