import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import fileDownload from 'js-file-download'
import _ from 'lodash'

function blobToData(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.addEventListener('about', reject)
    reader.addEventListener('error', reject)
    reader.addEventListener('loadend', () => {
      try {
        resolve(JSON.parse(reader.result))
      } catch (err) {
        reject(err)
      }
    })
    reader.readAsText(blob)
  })
}

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Auth-Token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  async response => {
    const resHeader = response.data.header
    let disposition = response.headers['content-disposition']
    if (disposition) {
      disposition = decodeURIComponent(disposition)
    }
    if ([0].includes(resHeader && resHeader.code)) {
      return response.data
    } else if (disposition && disposition.includes('attachment')) { // 下载文件
      const fileNameReg = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
      const matches = fileNameReg.exec(disposition)
      let filename
      if (matches != null && matches[1]) {
        filename = matches[1].replace(/['"]/g, '')
      }
      let resData
      try {
        // 能正常解析说明下载失败，没正常返回
        resData = await blobToData(response.data)
        return Promise.reject(resData)
      } catch (err) { // 下载成功
        fileDownload(response.data, filename)
        return
      }
    } else {
      const resData = response.data
      const resDataHeader = resData.header
      Message.closeAll()
      Message({
        message: resDataHeader.message || 'Server Error',
        type: 'error',
        duration: 5 * 1000
      })
      if ([1001].includes(resDataHeader.code)) {
        // to re-login
        MessageBox.confirm('该账户已在其他地方登录，请注意账户安全。', '风险提示', {
          showClose: false,
          confirmButtonText: '重新登录',
          showCancelButton: false,
          closeOnClickModal: false,
          closeOnPressEscape: false,
          type: 'error'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      const { config } = response
      const resSerialize = JSON.stringify(
        _.assign(resDataHeader || { message: 'Server Error' }, {
          requestConfigUrl: config.url,
          requestConfigBody: config.data
        })
      )
      return Promise.reject(resSerialize)
    }
  },
  error => {
    console.log('err' + error) // for debug
    if (error.response.status === 401) {
      // 处理token失效鉴权失败的问题
      MessageBox.confirm('会话超时，请重新登录', '超时提示', {
        confirmButtonText: '重新登录',
        showClose: false,
        showCancelButton: false,
        closeOnClickModal: false,
        closeOnPressEscape: false,
        type: 'error'
      }).then(() => {
        store.dispatch('user/resetToken').then(() => {
          location.reload()
        })
      })
    } else {
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
    }
    return Promise.reject(error)
  }
)

export default service
