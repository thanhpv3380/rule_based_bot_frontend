export const actionTypes = {
  ADD_BOT: 'ADD_BOT',
};

export function addBot(bot) {
  return {
    type: actionTypes.LOGIN,
    bot,
  };
}
