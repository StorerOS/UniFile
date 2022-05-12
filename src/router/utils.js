/*
 * @Author: yaohongbin
 * @Date: 2021-11-03 14:43:54
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-12-28 15:42:24
 * @FilePath: \dcim-system-frontend\src\router\utils.js
 */
import _ from 'lodash'
import path from 'path'
import store from '@/store'
import { asyncRoutes } from './index'

// 获取有权限的路由
export const getPermissionsRoutes = (() => {
  const filterPermissionsRouter = (routes, permissionsMapList = []) => {
    if (!routes || routes.length <= 0) return []
    const list = []
    routes.forEach(route => {
      if (permissionsMapList.includes(route.meta.permissions)) {
        if (route.children && route.children.length !== 0) {
          route.children = filterPermissionsRouter(route, permissionsMapList)
        }
        list.push(route)
      }
    })
    return list
  }
  return function filterRoutes(permissionsMapList) {
    if (!permissionsMapList || permissionsMapList.length <= 0) return []
    const endsRoutes = _.cloneDeep(asyncRoutes)
    const routes = endsRoutes.map(route => {
      return {
        ...route,
        children: filterPermissionsRouter(route.children, permissionsMapList)
      }
    })
    return routes
  }
})()

export function getRouteEnds(routes, type) {
  return routes && routes.find(route => {
    const replacePath = route.path.replace(/\//, '')
    return replacePath === type
  }) || null
}

// 获取有权限路由的第一个路径
export function getPermissionsFirstRouterPath(permissionsRoutes) {
  const assemblingPath = (routes, endPath) => {
    const paths = []
    const fillPath = (routes, endPath) => {
      return routes.some(route => {
        const replacePath = route.path.replace(/\//, '')
        if (route.children) {
          const flag = fillPath(route.children, endPath)
          if (flag) {
            paths.push(route.path)
            return true
          }
        } else {
          if (replacePath === endPath) {
            paths.push(route.path)
            return true
          }
        }
      })
    }
    fillPath(routes, endPath)
    return path.resolve(..._.reverse(paths))
  }
  const getFirstChild = (routes) => {
    let firstChild
    const child = (routes) => {
      return routes.some(r => {
        if (r.children && r.children.length > 0) {
          return child(r.children)
        } else {
          if (!r.hidden) {
            firstChild = r
            return true
          }
        }
        return false
      })
    }
    child(routes)
    return firstChild
  }

  const mapRoutes = getRouteEnds(permissionsRoutes, store.getters.managementType)
  const firstChild = mapRoutes && mapRoutes.children && getFirstChild(mapRoutes.children)

  return firstChild ? assemblingPath([mapRoutes], firstChild.path) : ''
}

