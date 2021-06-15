/* eslint-disable no-param-reassign */
import axios from 'axios';
import camelCase from 'camelcase-keys';
import { useSelector } from 'react-redux';
import { getCookie } from '../utils/cookie';

const axiosClient = axios.create({
  baseURL: `${process.env.REACT_APP_API_DOMAIN}/api/v1`,
  responseType: 'json',
  timeout: 15 * 1000,
  transformResponse: [(data) => camelCase(data, { deep: true })],
});

axiosClient.interceptors.request.use(async (config) => {
  const accessToken = getCookie('accessToken');
  const botId = useSelector((state) => state.bot.bot);
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
