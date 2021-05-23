export const actionTypes = {
  GET_SLOTS: 'GET_SLOTS',
  ADD_SLOTS: 'ADD_SLOT',
  UPDATE_SLOT: 'UPDATE_SLOT',
};

export function getAllSlot(botId) {
  return {
    type: actionTypes.GET_SLOTS,
    botId,
  };
}

export function addSlot(slot) {
  return {
    type: actionTypes.VERIFY_TOKEN,
    slot,
  };
}

export function updateSlot(accessToken) {
  return {
    type: actionTypes.VERIFY_TOKEN,
    accessToken,
  };
}
