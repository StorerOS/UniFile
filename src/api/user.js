
import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function qrcodeLogin(data) {
  return request({
    url: '/qrcode/login',
    method: 'post',
    data
  })
}

export function accountInfo(data) {
  return request({
    url: '/platform/user/detail',
    method: 'post',
    data: {}
  })
}
export function logout() {
  return request({
    url: '/platform/logout',
    method: 'post',
    data: {}
  })
}
export function changePassword(data) {
  return request({
    url: '/platform/change/password',
    method: 'post',
    data
  })
}

export function sendEmailCode(data) {
  return request({
    url: '/platform/send/email/code',
    method: 'post',
    data
  })
}
export function sendPhoneCode(data) {
  return request({
    url: '/platform/send/phone/code',
    method: 'post',
    data
  })
}
export function forgetAcount(data) {
  return request({
    url: '/platform/forget/password',
    method: 'post',
    data
  })
}

export function registerAccount(data) {
  return request({
    url: '/platform/register/account',
    method: 'post',
    data
  })
}

export function changeEmail(data) {
  return request({
    url: '/platform/change/email',
    method: 'post',
    data
  })
}
export function changePhone(data) {
  return request({
    url: '/platform/change/phone',
    method: 'post',
    data
  })
}
export function changeRate(data) {
  return request({
    url: '/platform/change/exrate',
    method: 'post',
    data
  })
}
export function changeDid(data) {
  return request({
    url: '/platform/change/did',
    method: 'post',
    data
  })
}

export function changeToken(data) {
  return request({
    url: '/platform/change/token',
    method: 'post',
    data
  })
}
