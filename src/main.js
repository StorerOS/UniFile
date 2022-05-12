import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import * as echarts from 'echarts'
import Clipboard from 'v-clipboard'
import '@/icons' // icon
import '@/permission' // permission control

import * as filters from './filters' // global filters

import { interceptionPromptAction } from '@/utils/response-Interception-process'

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)
Vue.use(Clipboard)
// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// Vue.directive('auth', {
//   inserted(el, binding) {
//     const premissions = store.state.user.userInfo.privilege
//     if (!premissions.includes(binding.value)) {
//       el.parentNode && el.parentNode.removeChild(el)
//       debugger
//     }
//   }
// })
Vue.config.productionTip = false
Vue.prototype.$echart = echarts
Vue.prototype.$interceptionPromptAction = interceptionPromptAction

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
