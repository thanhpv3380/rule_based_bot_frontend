import api from './api';

const login = async (email, password) => {
  const response = await api({
    method: 'POST',
    url: '/auths/login',
    data: { email, password },
  });
  return response;
};

const verify = async (accessToken) => {
  try {
    const response = await api({
      method: 'GET',
      url: '/auths/verify',
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export { login, verify };
