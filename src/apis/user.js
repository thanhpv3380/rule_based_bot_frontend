import api from './authApi';

export async function getUsers(search) {
  const response = await api({
    method: 'GET',
    url: '/accounts',
    params: { search },
  });
  return response;
}
