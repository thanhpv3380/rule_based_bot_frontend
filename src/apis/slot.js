import api from './authApi';

export async function getSlots() {
  const response = await api({
    method: 'GET',
    url: '/slots',
    params: {
      fields: 'name,displayName,dataType,slotType,customData',
      sort: 'name_desc',
    },
  });
  return response;
}

export async function getSlotById(id) {
  const response = await api({
    method: 'GET',
    url: `/slots/${id}`,
  });
  return response;
}

export async function createSlot(slot) {
  const response = await api({
    method: 'POST',
    url: '/slots',
    data: slot,
  });
  return response;
}

export async function updateSlot(id, slot) {
  const response = await api({
    method: 'PUT',
    url: `/slots/${id}`,
    data: slot,
  });
  return response;
}

export async function deleteSlot(id) {
  const response = await api({
    method: 'DELETE',
    url: `/slots/${id}`,
  });
  return response;
}
