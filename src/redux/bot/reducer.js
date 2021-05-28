/* eslint-disable no-case-declarations */
import { actionTypes } from './actions';

export const initialState = {
  bot: null,
  role: null,
  isProcessing: false,
};

export default function botReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_BOT:
      return { ...state, bot: null, role: null, isProcessing: true };

    case actionTypes.UPDATE_BOT:
      const { bot } = action;
      return { ...state, bot, isProcessing: false };

    case actionTypes.REMOVE_BOT:
      return { ...state, bot: null, role: null, isProcessing: false };

    case actionTypes.UPDATE_ROLE:
      const { role } = action;
      return { ...state, role };

    default:
      return state;
  }
}
