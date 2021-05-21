export const actionTypes = {
  CHANGE_BOT: 'CHANGE_BOT',
  GET_BOT: 'GET_BOT',
  REMOVE_BOT: 'REMOVE_BOT',
  UPDATE_ROLE: 'UPDATE_ROLE',
  GET_ROLE: 'GET_ROLE',
};

export function changeBot(bot) {
  return {
    type: actionTypes.CHANGE_BOT,
    bot,
  };
}

export function getBot() {
  return {
    type: actionTypes.GET_BOT,
  };
}

export function removeBot() {
  return {
    type: actionTypes.REMOVE_BOT,
  };
}

export function updateRole(role) {
  return {
    type: actionTypes.UPDATE_ROLE,
    role,
  };
}

export function getRole(botId) {
  return {
    type: actionTypes.GET_ROLE,
    botId,
  };
}
