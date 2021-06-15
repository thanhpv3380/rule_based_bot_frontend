/* eslint-disable no-param-reassign */
import axios from 'axios';
import camelCase from 'camelcase-keys';
import { getCookie } from '../utils/cookie';

let botId = null;

const axiosClient = axios.create({
  baseURL: `${process.env.REACT_APP_API_DOMAIN}/api/v1`,
  responseType: 'json',
  timeout: 15 * 1000,
  transformResponse: [(data) => camelCase(data, { deep: true })],
});

export function setBot(id) {
  botId = id;
}

axiosClient.interceptors.request.use(async (config) => {
  const accessToken = getCookie('accessToken');
  config.headers.Authorization = `Bearer ${accessToken}`;
  config.headers['bot-id'] = botId;
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // Handle error
    console.error(error);
  },
);

export default axiosClient;
