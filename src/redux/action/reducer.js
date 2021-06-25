import { actionTypes } from './actions';

export const initialState = {
  actions: null,
  isFetching: false,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_ACTIONS:
      return { ...state, isFetching: true };

    case actionTypes.GET_ACTIONS_SUCCESS: {
      const { actions } = action;
      return { ...state, isFetching: false, actions: [...actions] };
    }

    case actionTypes.GET_ACTIONS_FAILURE: {
      return { ...state, isFetching: false };
    }

    case actionTypes.ADD_ACTION: {
      const { data } = action;
      const { actions } = state;
      const newActions = actions && Array.isArray(actions) ? [...actions] : [];
      return { ...state, actions: [{ ...data }, ...newActions] };
    }

    case actionTypes.DELETE_ACTION: {
      const { id } = action;
      const { actions } = state;
      const newActions = actions && Array.isArray(actions) ? [...actions] : [];
      const index = newActions.findIndex((el) => el.id === id);
      newActions.splice(index, 1);
      return { ...state, actions: [...newActions] };
    }

    default:
      return state;
  }
}
