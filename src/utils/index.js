/**
 * Created by PanJiaChen on 16/11/18.
 */

import _ from 'lodash'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string')) {
      if ((/^[0-9]+$/.test(time))) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {number | string} val
 * @returns {string}
 */
export function turnByte(val) {
  if (!val) {
    return '0KB'
  }
  const kb = Number(val) / 1024
  const mb = kb / 1024
  const gb = mb / 1024
  const tb = gb / 1024
  let n
  if (kb < 1024) {
    n = `${kb.toFixed(2)}KB`
  } else if (mb >= 1 && mb < 1024) {
    n = `${mb.toFixed(2)}MB`
  } else if (gb >= 1 && gb < 1024) {
    n = `${gb.toFixed(2)}GB`
  } else if (tb >= 1) {
    n = `${tb.toFixed(2)}TB`
  } else {
    n = '0KB'
  }
  return n
}
/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach(v => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}

/**
 * @param {Element} element
 * @param {String} fileName
 * @returns {Promise}
 */
export function element2PDF(element, fileName = Date.now() + '.pdf') {
  return new Promise((resolve, reject) => {
    if (!_.isElement(element)) {
      const errObject = new Error('Incorrect format of incoming parameters')
      reject(errObject)
      throw new Error(errObject)
    }
    html2canvas(element, {
      background: '#ffffff',
      scale: 3
    }).then(canvas => {
      const contentWidth = canvas.width
      const contentHeight = canvas.height
      const pageHeight = contentWidth / 592.28 * 841.89
      let leftHeight = contentHeight
      let position = 0
      const imgWidth = 595.28
      const imgHeight = 592.28 / contentWidth * contentHeight
      const pageData = canvas.toDataURL('image/jpeg', 1.0)
      // eslint-disable-next-line new-cap
      const PDF = new jsPDF('', 'pt', 'a4')
      if (leftHeight < pageHeight) {
        PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
      } else {
        while (leftHeight > 0) {
          PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
          leftHeight -= pageHeight
          position -= 841.89
          if (leftHeight > 0) {
            PDF.addPage()
          }
        }
      }
      PDF.save(fileName)
      resolve()
    }).catch(reject)
  })
}
/**
 * @param {string} list
 * @param {string} childKey
 * @returns {Array}
 */
export function filterAreaList(list, childKey = 'spaces') {
  if (!list || list.length <= 0) []
  return list.map(item => {
    const childrens = item[childKey]
    if (childrens && childrens.length > 0) {
      item[childKey] = filterAreaList(childrens)
      return item
    } else {
      return _.omit(item, childKey)
    }
  })
}

export function byte2Any(val, unit = 'GB', autoUnit = false, maxLength = 4, hasUnit = false) {
  const units = ['KB', 'MB', 'GB', 'TB', 'PB']
  if (!_.isNumber(Number(val))) {
    new Error('illegal data format, should use Number')
    return
  }
  if (!autoUnit) {
    const idx = units.findIndex(item => item == unit)
    const size = idx === -1 ? 1 : idx
    const result = Math.round((val / Math.pow(1024, size + 1)) * 100) / 100
    return hasUnit ? result + unit : result
  }
  const maxLengthSize = maxLength * 10
  const idx = units.find((item, index) => (val / Math.pow(1000, index + 1)) < maxLengthSize)
  if (idx == undefined) {
    const result = Math.round(val / Math.pow(1000, units.length))
    return hasUnit ? result + 'PB' : result
  }
  const result = Math.round(val / Math.pow(1000, idx + 1))
  return hasUnit ? result + 'PB' : result
}
