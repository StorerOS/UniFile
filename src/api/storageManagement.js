/*
 * @Author: your name
 * @Date: 2021-12-09 15:26:02
 * @LastEditTime: 2021-12-29 10:04:08
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \stoss-console\src\api\storageManagement.js
 */
import request from '@/utils/request'

export function getSpaceList(data) {
  return request({
    url: '/store/list/space',
    method: 'post',
    data
  })
}
export function getUserList(data) {
  return request({
    url: '/store/list/user',
    method: 'post',
    data
  })
}
export function createSpace(data) {
  return request({
    url: '/store/create/space',
    method: 'post',
    data
  })
}
export function createStoreUser(data) {
  return request({
    url: '/store/create/user',
    method: 'post',
    data
  })
}
export function editStoreUser(data) {
  return request({
    url: '/store/edit/user',
    method: 'post',
    data
  })
}

export function getSpaceOverviewList(data) {
  return request({
    url: '/store/list/space-overview',
    method: 'post',
    data
  })
}
export function setupSpace(data) {
  return request({
    url: '/store/edit/space-setting',
    method: 'post',
    data
  })
}
export function addSpaceDir(data) {
  return request({
    url: '/store/create/space-dir',
    method: 'post',
    data
  })
}
export function deleteStoreUser(data) {
  return request({
    url: '/store/delete/user',
    method: 'post',
    data
  })
}
export function disableStoreUser(data) {
  return request({
    url: '/store/disable/user',
    method: 'post',
    data
  })
}
export function deleteStoreUserAK(data) {
  return request({
    url: '/store/delete/ak',
    method: 'post',
    data
  })
}
export function addStoreUserAK(data) {
  return request({
    url: '/store/create/ak',
    method: 'post',
    data
  })
}
export function getStoreUserDetail(data) {
  return request({
    url: '/store/user/detail',
    method: 'post',
    data
  })
}

export function deleteSpaceFile(data) {
  return request({
    url: '/store/delete/space-file',
    method: 'post',
    data
  })
}

export function getBucketList(data) {
  return request({
    url: '/platform/list/bucket',
    method: 'post',
    data
  })
}
export function delBucket(data) {
  return request({
    url: '/platform/delete/bucket',
    method: 'post',
    data
  })
}
export function addBucket(data) {
  return request({
    url: '/platform/add/bucket',
    method: 'post',
    data
  })
}

export function getFileList(data) {
  return request({
    url: '/platform/list/file',
    method: 'post',
    data
  })
}
export function addFile(data) {
  return request({
    url: '/platform/add/file',
    method: 'post',
    data
  })
}
export function delFile(data) {
  return request({
    url: '/platform/delete/file',
    method: 'post',
    data
  })
}
