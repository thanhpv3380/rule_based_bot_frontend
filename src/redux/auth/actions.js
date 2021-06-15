export const actionTypes = {
  LOGIN: 'LOGIN',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  VERIFY_TOKEN: 'VERIFY_TOKEN',
  VERIFY_TOKEN_SUCCESS: 'VERIFY_TOKEN_SUCCESS',
  VERIFY_TOKEN_FAILURE: 'VERIFY_TOKEN_FAILURE',
  LOGOUT: 'LOGOUT',
  LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
};

export function login(email, password) {
  return {
    type: actionTypes.LOGIN,
    email,
    password,
  };
}

export function loginSuccess(accessToken, user) {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    accessToken,
    user,
  };
}

export function loginFailure() {
  return {
    type: actionTypes.LOGIN_FAILURE,
  };
}

export function verifyToken(accessToken) {
  return {
    type: actionTypes.VERIFY_TOKEN,
    accessToken,
  };
}

export function verifyTokenSuccess(accessToken, user) {
  return {
    type: actionTypes.VERIFY_TOKEN_SUCCESS,
    accessToken,
    user,
  };
}

export function verifyTokenFailure() {
  return {
    type: actionTypes.VERIFY_TOKEN_FAILURE,
  };
}

export function logout() {
  return {
    type: actionTypes.LOGOUT,
  };
}

export function logoutSuccess() {
  return {
    type: actionTypes.LOGOUT_SUCCESS,
  };
}
