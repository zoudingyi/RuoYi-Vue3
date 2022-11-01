import Cookies from 'js-cookie';

const TokenKey = 'OAUTH2'; // 必须与oauth2自动存储的名称相同

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}
