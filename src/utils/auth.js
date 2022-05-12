import Cookies from 'js-cookie'

const TokenKey = 'auth_token'
const userInfoKey = 'user_info'
const accountInfoKey = 'user_account_info'
const chainTypeKey = 'system_chain_type'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getUserInfo() {
  const userInfo = Cookies.get(userInfoKey)
  return userInfo ? JSON.parse(userInfo) : null
}

export function setUserInfo(info) {
  return Cookies.set(userInfoKey, info)
}

export function getInfo() {
  const info = Cookies.get(accountInfoKey)
  return info ? JSON.parse(info) : null
}
export function getChianType() {
  const chainType = Cookies.get(chainTypeKey)
  return chainType || ''
}
export function setChianType(type) {
  return Cookies.set(chainTypeKey, type)
}
export function setInfo(info) {
  return Cookies.set(accountInfoKey, info)
}
export function removeInfo() {
  return Cookies.remove(accountInfoKey)
}
export function removeUserInfo() {
  return Cookies.remove(userInfoKey)
}

export function removeAllAuthInfo() {
  Object.keys(Cookies.get()).forEach((key) => {
    Cookies.remove(key)
  })
  window.localStorage.clear()
}
