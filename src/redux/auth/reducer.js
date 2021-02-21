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

    case actionTypes.LOGIN_SUCCESS: {
      const { accessToken, user } = action;
      return { ...state, isLoggingIn: false, accessToken, user };
    }

    case actionTypes.LOGIN_FAILURE: {
      const { code } = action;
      return { ...state, loginCode: code, isLoggingIn: false };
    }

    case actionTypes.VERIFY_TOKEN:
      return { ...state, verifying: true };

    case actionTypes.VERIFY_TOKEN_SUCCESS: {
      const { accessToken, user } = action;
      return {
        ...state,
        verifying: false,
        accessToken,
        user,
      };
    }

    case actionTypes.VERIFY_TOKEN_FAILURE:
      return { ...state, verifying: false };

    case actionTypes.LOGOUT:
      return { ...state, accessToken: null };

    default:
      return state;
  }
}
