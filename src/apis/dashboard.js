import api from './authApi';
import { renderQueryAll } from '../utils/query';

export async function getDashboard(query) {
  const newQuery = renderQueryAll(query);
  const response = await api({
    method: 'GET',
    url: `/dashboards?${newQuery}`,
  });
  return response;
}

export async function getStatisticWorkingData() {
  const response = await api({
    method: 'GET',
    url: `/dashboards/statisticWorkingData`,
  });
  return response;
}
