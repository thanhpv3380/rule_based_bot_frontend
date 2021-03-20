import api from './authApi';
import { renderQueryAll } from '../utils/query';

export async function getDictionaries(query) {
  const newQuery = renderQueryAll(query);
  const response = await api({
    method: 'GET',
    url: `/dictionaries?${newQuery}`,
  });
  return response;
}

export async function getDictionaryById(id) {
  const response = await api({
    method: 'GET',
    url: `/dictionaries/${id}`,
  });
  return response;
}

export async function createDictionary(dictionary) {
  const response = await api({
    method: 'POST',
    url: '/dictionaries',
    data: dictionary,
  });
  return response;
}

export async function updateDictionary(id, dictionary) {
  const response = await api({
    method: 'PUT',
    url: `/dictionaries/${id}`,
    data: dictionary,
  });
  return response;
}

export async function deleteDictionary(id) {
  const response = await api({
    method: 'DELETE',
    url: `/dictionaries/${id}`,
  });
  return response;
}
