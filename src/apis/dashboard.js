import api from './authApi';
import { renderQueryAll } from '../utils/query';

export async function getDashboard(query) {
  const newQuery = renderQueryAll(query);
  console.log(newQuery, 'new query');
  const response = await api({
    method: 'GET',
    url: `/dashboards?${newQuery}`,
  });
  return response;
}
