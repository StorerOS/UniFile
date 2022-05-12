const Mock = require('mockjs')

const chainData = Mock.mock({
  'items|10': [
    {
      'id': 1,
      'msg_id': '0x477a9d5df9beda06f6b021136a2efe7be242fcc9', // 上链hash
      'device_type': 'gggg', // 设备类型
      'device_id': '11', // 设备id
      'start_time': '2021-12-23 12:20:21', // 数据采集开始时间
      'end_time': '2021-12-23 12:20:21', // 数据采集结束时间
      'chain_type|0-1': 0, // 上链状态
      'action_time': '2021-12-23 12:20:21', // 上链时间
      'signal_count|1-100': 100, // 信号总数
      'warning_count|1-100': 100// 告警总数
    }
  ]
})

module.exports = [
  {
    url: '/list/data/chain',
    type: 'post',
    response: config => {
      return {
        header: {
          code: 0,
          message: 'CODE_OK',
          total: 100,
          count: config.body.page_no
        },
        data: {
          chain_list: chainData.items
        }
      }
    }
  }
]
