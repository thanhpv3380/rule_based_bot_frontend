export const actionTypes = {
  CHANGE_BOT: 'CHANGE_BOT',
  GET_BOT: 'GET_BOT',
  REMOVE_BOT: 'REMOVE_BOT',
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
