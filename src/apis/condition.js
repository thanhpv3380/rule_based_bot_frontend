import api from './authApi';

export async function createCondition({ operator, conditions }) {
  const response = await api({
    method: 'POST',
    url: '/conditions',
    data: { operator, conditions },
  });
  return response;
}

export async function getConditionById(id) {
  const response = await api({
    method: 'GET',
    url: `/conditions/${id}`,
  });
  return response;
}

export async function updateCondition(id, nodes) {
  const response = await api({
    method: 'PUT',
    url: `/conditions/${id}`,
    data: nodes,
  });
  return response;
}
