import { actionTypes } from './actions';

export const initialState = {
  intents: null,
  isFetching: false,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_INTENTS:
      return { ...state, isFetching: true };

    case actionTypes.GET_INTENTS_SUCCESS: {
      const { intents } = action;
      return { ...state, isFetching: false, intents: [...intents] };
    }

    case actionTypes.GET_INTENTS_FAILURE: {
      return { ...state, isFetching: false };
    }

    case actionTypes.ADD_INTENT: {
      const { data } = action;
      const { intents } = state;
      const newIntents = intents && Array.isArray(intents) ? [...intents] : [];
      return { ...state, intents: [{ ...data }, ...newIntents] };
    }

    case actionTypes.DELETE_INTENT: {
      const { id } = action;
      const { intents } = state;
      const newIntents = intents && Array.isArray(intents) ? [...intents] : [];
      const index = newIntents.findIndex((el) => el.id === id);
      newIntents.splice(index, 1);
      return { ...state, intents: [...newIntents] };
    }

    default:
      return state;
  }
}
