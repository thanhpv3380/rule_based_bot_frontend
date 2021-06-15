import axios from 'axios';
import api from './api';

const { REACT_APP_PORTAL_DOMAIN } = process.env;

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

const logout = async (accessToken) => {
  const response = await axios({
    method: 'POST',
    url: `${REACT_APP_PORTAL_DOMAIN}/api/v1/auths/logout`,
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response;
};

export { login, verify, logout };
