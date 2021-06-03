export const actionTypes = {
  GET_BOT: 'GET_BOT',
  UPDATE_BOT: 'UPDATE_BOT',
  REMOVE_BOT: 'REMOVE_BOT',
  GET_ROLE: 'GET_ROLE',
  UPDATE_ROLE: 'UPDATE_ROLE',
  REMOVE_ROLE: 'REMOVE_ROLE',
};

export function getBot(botId) {
  return {
    type: actionTypes.GET_BOT,
    botId,
  };
}

export function updateBot(bot) {
  return {
    type: actionTypes.UPDATE_BOT,
    bot,
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
