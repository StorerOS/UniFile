function findData(list, value, valueKey) {
  return ![undefined, null].includes(value) ? list.find(item => item[valueKey || 'value'] === value) || {} : list
}

export function calibrationStatus(code) {
  const list = [
    {
      value: 0,
      text: '失败',
      type: 'danger'
    }, {
      value: 1,
      text: '成功',
      type: 'success'
    }
  ]
  return findData(list, code)
}
export function availableStatus(code) {
  const list = [
    {
      value: 1,
      text: '启用',
      type: 'success'
    }, {
      value: 2,
      text: '禁用',
      type: 'danger'
    }
  ]
  return findData(list, code)
}

export function actionStatus(code) {
  const list = [
    {
      value: 1,
      text: '开机',
      type: 'success'
    }, {
      value: 2,
      text: '关机',
      type: 'danger'
    }
  ]
  return findData(list, code)
}

export function calibrationStatus2(code) {
  const list = [
    {
      value: 1,
      text: '失败',
      type: 'danger'
    }, {
      value: 2,
      text: '成功',
      type: 'success'
    }
  ]
  return findData(list, code)
}

export function dataTypeStatus(code) {
  const list = [
    {
      value: 1,
      text: '信号'
    }, {
      value: 2,
      text: '告警'
    }
  ]
  return findData(list, code)
}
