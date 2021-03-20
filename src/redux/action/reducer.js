import { actionTypes } from './actions';

export const initialState = {
  accessToken: null,
  isLoggingIn: false,
  verifying: false,
  loginCode: null,
  user: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOGIN:
      return { ...state, isLoggingIn: true };

    default:
      return state;
  }
}
