import { actionTypes } from './actions';

export const initialState = {
  bot: null,
};

export default function botReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.BOT:
      const { bot } = action;
      return { ...state, bot };

    default:
      return state;
  }
}
