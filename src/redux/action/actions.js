export const actionTypes = {
  LOGIN: 'LOGIN',
};

export function login(email, password) {
  return {
    type: actionTypes.LOGIN,
    email,
    password,
  };
}
