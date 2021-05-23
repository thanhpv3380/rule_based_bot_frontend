/* eslint-disable no-case-declarations */
import { actionTypes } from './actions';

export const initialState = {
  bot: null,
  role: null,
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
    case actionTypes.UPDATE_ROLE:
      // eslint-disable-next-line no-case-declarations
      const { role } = action;
      return { ...state, role };
    case actionTypes.GET_ROLE:
      return state;
    default:
      return state;
  }
}
