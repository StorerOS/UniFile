
module.exports = [
  {
    // 5.2.1.3 空间概览
    url: '/store/list/space-overview',
    type: 'post',
    response: config => {
      return {
        header: {
          code: 0,
          message: 'CODE_OK',
          total: 1,
          count: 1
        },
        data: {
          'list|10': [
            {
              'file_name': 'test1', // 对象名称
              'object_type': 1, // 文件类型(0=未知类型 1=文件 2=文件夹)
              'object_size': 4096, // 对象大小(单位: KB)
              'updated_time': '2021-12-07 09:55:02' // 最后修改时间
            }
          ]
        }
      }
    }
  },
  {
    url: '/store/list/space',
    type: 'post',
    response: config => {
      return {
        header: {
          code: 0,
          message: 'CODE_OK',
          total: 1,
          count: 1
        },
        data: {
          'list|10': [
            {
              'space_name': 'sotstest', // 空间名称
              'user_name': 'libin@wenchu.io', // 归属用户
              'acl_type': 'public', // 访问控制类型(公开=public 私有=private)
              'used_volume': 0.25, // 存储量(单位：PB)
              'quota_volume': 100, // 配额(单位: PB)
              'total_object': 123590, // 总对象数
              'created_time': '2021-11-23 10:52:33' // 创建时间
            }
          ]
        }
      }
    }
  },
  {
    url: '/store/list/user',
    type: 'post',
    response: config => {
      return {
        header: {
          code: 0,
          message: 'CODE_OK',
          total: 1,
          count: 1
        },
        data: {
          'list|10': [
            {
              'id|+1': 2, // 存储用户ID
              'user_name|1-10': '★', // 存储用户名
              'created_time': '2021-10-19 10:32:00', // 创建时间
              'state': 2 // 状态(1=已启用 2=已禁用)
            }
          ]
        }
      }
    }
  },
  {
    url: '/store/create/space',
    type: 'post',
    response: config => {
      return {
        header: {
          code: 0,
          message: 'CODE_OK',
          total: 1,
          count: 1
        },
        data: {}
      }
    }
  },
  {
    url: '/store/edit/space-setting',
    type: 'post',
    response: config => {
      return {
        header: {
          code: 0,
          message: 'CODE_OK',
          total: 1,
          count: 1
        },
        data: {}
      }
    }
  },
  {
    url: '/store/create/space-dir',
    type: 'post',
    response: config => {
      return {
        header: {
          code: 0,
          message: 'CODE_OK',
          total: 1,
          count: 1
        },
        data: {}
      }
    }
  },
  {
    url: '/store/delete/user',
    type: 'post',
    response: config => {
      return {
        header: {
          code: 0,
          message: 'CODE_OK',
          total: 1,
          count: 1
        },
        data: {}
      }
    }
  },
  {
    url: '/store/delete/user',
    type: 'post',
    response: config => {
      return {
        header: {
          code: 0,
          message: 'CODE_OK',
          total: 1,
          count: 1
        },
        data: {}
      }
    }
  }, {
    url: '/store/disable/user',
    type: 'post',
    response: config => {
      return {
        header: {
          code: 0,
          message: 'CODE_OK',
          total: 1,
          count: 1
        },
        data: {}
      }
    }
  },
  {
    url: '/store/create/ak',
    type: 'post',
    response: config => {
      return {
        header: {
          code: 0,
          message: 'CODE_OK',
          total: 1,
          count: 1
        },
        data: {}
      }
    }
  },
  {
    url: '/store/delete/ak',
    type: 'post',
    response: config => {
      return {
        header: {
          code: 0,
          message: 'CODE_OK',
          total: 1,
          count: 1
        },
        data: {}
      }
    }
  },
  {
    url: '/store/user/detail',
    type: 'post',
    response: config => {
      return {
        header: {
          code: 0,
          message: 'CODE_OK',
          total: 1,
          count: 1
        },
        data: {
          'user_name': 'lory', // 存储用户名
          'space_total': 2, // 分配空间数
          'keys': [
            {
              'ak': 'asdkfjasldfkjsadf',
              'sk': '923asfaskdfajsedf32ajsdf',
              'created_time': '2021-11-22 10:32:09'
            },
            {
              'ak': '64asijxvhsldfksldsll',
              'sk': '2253asldfksldsldf32ajsdf',
              'created_time': '2021-11-22 11:23:09'
            }
          ]
        }
      }
    }
  }
]

