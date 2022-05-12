import router from './router'

import store from './store'
import { asyncRoutes } from '@/router'
import { Message } from 'element-ui'
import { accountInfo } from '@/api/user'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/403', '/404', '/calibrationCenter', '/certTemplate'] // no redirect whitelist
router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()
  console.log(router)
  // set page title
  document.title = getPageTitle(to.meta.title)
  const hasToken = getToken()
  if (whiteList.includes(to.path)) {
    next()
  } else if (hasToken) { // determine whether the user has logged in
    const { info } = store.getters
    if (info && info.email) {
      next()
    } else {
      try {
        const userInofs = (await accountInfo()).data
        await store.dispatch('user/setInfo', userInofs)
        store.dispatch('user/setPermissionsRoutes', asyncRoutes)
        router.addRoutes(asyncRoutes)
      } catch (err) {
        Message.error(err)
        await store.dispatch('user/resetToken')
        next(`/login?redirect=${to.path}`)
      }
      next({ path: '/', replace: true })
    }
  } else {
    next(`/login?redirect=${to.path}`)
  }
  NProgress.done()
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
