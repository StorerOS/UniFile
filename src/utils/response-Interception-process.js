
import { Message } from 'element-ui'
import _ from 'lodash'

// 错误消息映射
const errorCodeMap = {
  '-1': { code: 'CODE_ERROR', text: '未知错误' },
  500: { code: 'CODE_INTERNAL_SERVER_ERROR', text: '内部服务器错误' },
  1000: { code: 'CODE_ACCESS_DENY', text: '无访问权限' },
  1001: { code: 'CODE_UNAUTHORIZED', text: 'TOKEN鉴权失败' },
  1002: { code: 'CODE_INVALID_USER_OR_PASSWORD', text: '无效用户名或密码' },
  1003: { code: 'CODE_INVALID_PARAMS', text: '无效参数' },
  1004: { code: 'CODE_INVALID_JSON_OR_REQUIRED_PARAMS', text: '请求数据JSON格式不正确或缺少必填参数' },
  1005: { code: 'CODE_ALREADY_EXIST', text: '数据已存在(用户名/邮箱/权限名称等等)' },
  1006: { code: 'CODE_NOT_FOUND', text: '没有找到数据' },
  1007: { code: 'CODE_INVALID_PASSWORD', text: '无效密码' },
  1008: { code: 'CODE_INVALID_AUTH_CODE', text: '无效验证码或验证码超时' },
  1009: { code: 'CODE_ACCESS_VIOLATE', text: '访问违规' },
  1010: { code: 'CODE_TYPE_UNDEFINED', text: '类型未定义' }
}

// 请求参数校验
function requestParamsHandler(val, parasmText) {
  if (!_.isString(val) && !_.isObject(val)) {
    console.error(new Error(`"${parasmText}" Parameters can only be of type Object|String`))
    return false
  }
  return true
}

/**
 * @function
 * @description 对接口响应进行拦截处理。通过可配置化形式对成功、错误、或者服务器消息进行干预提示
 * @param {Function} fn (successMsgInfo: Object, messageKey: String = message) => successMsgInfo  successMsgInfo: 成功的状态信息，messageKey: 状态消息key
 * @param {String | Object} [error] 错误提示配置信息。string: 错误消息文本 Object: { isServer: Boolean = true 是否应用服务器错误信息, message: 错误消息文本，可其他key }
 * @param {String | Object} [success] 成功提示配置信息。string: 成功消息文本 Object: { isServer: Boolean = false 是否应用服务器成功信息, message: 成功消息文本，可其他key }
 * @returns
 */

async function interceptionPromptAction(fn, error, success) {
  if (
    error && !requestParamsHandler(error, 'error') ||
    success && !requestParamsHandler(success, 'success')
  ) {
    throw new Error('Incorrect parameter type')
  }

  const errorObj = { isServer: false }
  const successObj = { isServer: false }

  // error 参数组装
  if (error) {
    _.assign(
      errorObj,
      _.isObject(error) ? error : { message: error, isServer: false }
    )
  }

  // success 参数组装
  if (success) {
    _.assign(
      successObj,
      _.isObject(success) ? success : { message: success, isServer: false }
    )
  }

  const configOptions = {
    successHeaderInfo: null,
    messageKey: 'message'
  }

  // fn函数参数回调
  const optionCallback = (successHeaderInfo, messageKey = 'message') => {
    _.assign(configOptions, {
      successHeaderInfo,
      messageKey
    })
  }

  try {
    const msg = await fn(optionCallback)

    const { successHeaderInfo, messageKey } = configOptions
    const compatibleMsg = successHeaderInfo || msg
    if (compatibleMsg) {
      const successTips = successObj.isServer ? compatibleMsg[messageKey] : successObj.message
      if (successTips) {
        Message.closeAll()
        Message.success(successTips)
      }
    }
  } catch (err) {
    try {
      const errMessage = JSON.parse(err.message)
      const code = errMessage.code
      const { messageKey } = configOptions
      const unknownErrorText = errorCodeMap['-1'].text
      const mergeErrorInfo = _.merge({}, errorCodeMap, errorObj.message)

      const errorText =
        errorObj.message && !_.isObject(errorObj.message)
          ? errorObj.message
          : (mergeErrorInfo[code] && mergeErrorInfo[code].text)

      const compatibleTips =
        errorObj.isServer && errMessage[messageKey] || // 接口响应错误
        errorText || // 传入的错误
        (_.isObject(mergeErrorInfo.default) ? mergeErrorInfo.default.text : mergeErrorInfo.default) || // 传入的默认错误
        unknownErrorText // 未知错误

      Message.closeAll()
      Message.error(compatibleTips)
    } catch (err) {
      console.error(new Error('[err]：Failed to parse'))
    }
    throw err
  }
}

export {
  interceptionPromptAction
}
