/* eslint-disable no-case-declarations */
import { actionTypes } from './actions';

export const initialState = {
  bot: null,
};

export default function botReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_BOT:
      const { bot } = action;
      return { ...state, bot };
    case actionTypes.GET_BOT:
      return state;
    case actionTypes.REMOVE_BOT:
      return { state, bot: null };
    default:
      return state;
  }
}
