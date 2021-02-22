/* eslint-disable no-param-reassign */
import axios from 'axios';
import camelCase from 'camelcase-keys';

const axiosClient = axios.create({
  baseURL: `${process.env.REACT_APP_API_DOMAIN}/api/v1`,
  responseType: 'json',
  timeout: 15 * 1000,
  transformResponse: [(data) => camelCase(data, { deep: true })],
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
