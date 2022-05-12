import dayjs from 'dayjs'
import _ from 'lodash'

export function timeFormat(time, f) {
  if (!time) return ''
  const t = time * 1000
  if (!f) return dayjs(t).format('YYYY-MM-DD HH:mm:ss')
  return dayjs(t).format(f)
}

export function byte2Any(val, { unit = '', initUnit = 'B', autoUnit = false, maxLength = 4, hasUnit = false }) {
  const units = ['B', 'KB', 'MB', 'GB', 'Tb', 'PB']
  if (!_.isNumber(Number(val))) {
    new Error('illegal data format, should use Number')
    return
  }
  if (autoUnit) {
    let idx = units.findIndex(item => item === initUnit) || 0
    let value = val
    while (value > 10 * maxLength) {
      value = value / 1000
      idx += 1
    }
    if (hasUnit) return Math.round(val / Math.pow(1000, idx)) + units[idx]
    return Math.round(val / Math.pow(1000, idx))
  }
  const idx = units.findIndex(item => item === unit) || 0
  if (hasUnit) return Math.round(val / Math.pow(1000, idx)) + units[idx]
  return Math.round(val / Math.pow(1000, idx))
}

