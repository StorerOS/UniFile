import request from '@/utils/request'

export function downloadFile(data) {
  return request({
    url: '/store/download/space-file',
    method: 'post',
    headers: {
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9'
    },
    responseType: 'arraybuffer',
    data
  })
}
export function uploadFile(data) {
  return request({
    url: '/store/upload/space-file',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data
  })
}

export function addObserve(data) {
  return request({
    url: '/platform/add/observe',
    method: 'post',
    data
  })
}

export function searchAddress(data) {
  return request({
    url: '/platform/search/address',
    method: 'post',
    data
  })
}
export function observeList(data) {
  return request({
    url: '/platform/list/observe',
    method: 'post',
    data
  })
}
export function accountOverview(data) {
  return request({
    url: '/platform/account/overview',
    method: 'post',
    data
  })
}
export function tradeHistory(data) {
  return request({
    url: '/platform/trade/history',
    method: 'post',
    data
  })
}
export function usedManage(data) {
  return request({
    url: '/platform/used/manage',
    method: 'post',
    data
  })
}
export function getChainList(data) {
  return request({
    url: '/platform/list/chain/type',
    method: 'post',
    data: {}
  })
}
export function getPointsList(data) {
  return request({
    url: '/platform/list/points',
    method: 'post',
    data: {}
  })
}
export function getPointsOverview(data) {
  return request({
    url: '/platform/overview/points',
    method: 'post',
    data: {}
  })
}

