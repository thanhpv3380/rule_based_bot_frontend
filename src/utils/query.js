/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-undef */
export function renderQueryAll(query) {
  let str = '';
  for (const key in query) {
    str += `&${key}=${query[key]}`;
  }
  return str;
}
