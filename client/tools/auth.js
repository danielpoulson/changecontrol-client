/* eslint-disable */
export function requireAuth() {
  return sessionStorage.getItem('authorised');
}
