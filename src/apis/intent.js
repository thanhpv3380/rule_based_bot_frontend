import api from './authApi';

export async function getIntents() {
  const response = await api({
    method: 'GET',
    url: '/intents',
  });
  return response;
}

export async function getIntent(id) {
  const response = await api({
    method: 'GET',
    url: `/intents/${id}`,
  });
  return response;
}

export async function createIntent(intent) {
  const response = await api({
    method: 'POST',
    url: '/intents',
    data: intent,
  });
  return response;
}

export async function updateIntent(id, intent) {
  const response = await api({
    method: 'PUT',
    url: `/intents/${id}`,
    data: intent,
  });
  return response;
}

export async function deleteIntent(id) {
  const response = await api({
    method: 'DELETE',
    url: `/intents/${id}`,
  });
  return response;
}

export async function addUsersay(id, pattern) {
  const response = await api({
    method: 'PUT',
    url: `/intents/${id}/addUsersay`,
    data: { pattern },
  });
  return response;
}

export async function removeUsersay(id, pattern) {
  const response = await api({
    method: 'PUT',
    url: `/intents/${id}/removeUsersay`,
    data: { pattern },
  });
  return response;
}

export async function addParameter(id, parameter) {
  const response = await api({
    method: 'PUT',
    url: `/intents/${id}/addParameter`,
    data: { parameter },
  });
  return response;
}

export async function removeParameter(id, parameter) {
  const response = await api({
    method: 'PUT',
    url: `/intents/${id}/removeParameter`,
    data: { parameter },
  });
  return response;
}

export async function getParametersIntent(intents) {
  const response = await api({
    method: 'POST',
    url: `/intents/getParameters`,
    data: { intents },
  });
  return response;
}
