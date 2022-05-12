
const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

module.exports = [
  // user login
  {
    url: '/login',
    type: 'post',
    response: config => {
      const { name } = config.body
      const token = tokens[name]

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }
      return {
        header: {
          code: 0,
          message: 'CODE_OK',
          total: 1,
          count: 1
        },
        data: {
          user_name: 'libin',
          auth_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGFpbV9leHBpcmUiOjE2MjE1NzgxODIsImNsYWltX2lhdCI6MTYyMDk3MzM4MiwiY2xhaW1faWQiOjEzLCJjbGFpbV9pc19hZG1pbiI6ZmFsc2UsImNsYWltX3VzZXJuYW1lIjoibGliaW4ifQ.haUXz_hihQebreN54aulsxEadY7oXOEbcCVNLb23ujY',
          role: 'admin',
          privilege: ['DataSummary', 'UserAccess', 'RoleAccess', 'OperLogAccess', 'OperLogAccess', 'SpaceAccess', 'StoreUserAccess']
        }
      }
    }
  },

  // get user info
  {
    url: '/vue-admin-template/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 20000,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/logout',
    type: 'post',
    response: _ => {
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
    url: '/platform/list/role',
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
          'roles': [
            {
              'id': 1,
              'name': 'platform-admin', // 名称
              'create_user': 'admin', // 创建者
              'remark': '平台超级管理员角色', // 描述信息
              'created_time': '2021-04-13 10:38:40' // 创建时间
            },
            {
              'id': 2,
              'name': 'platform-admin', // 名称
              'create_user': 'admin', // 创建者
              'remark': '平台超级管理员角色', // 描述信息
              'created_time': '2021-04-13 10:38:40' // 创建时间
            }
          ]
        }
      }
    }
  },
  {
    url: '/platform/inquire/auth',
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
          'privilege': ['DataSummary', 'UserAccess', 'UserAdd']
        }
      }
    }
  },
  {
    url: '/platform/auth/role',
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

        }
      }
    }
  },
  {
    url: '/platform/delete/user',
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

        }
      }
    }
  },
  {
    url: '/platform/create/role',
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

        }
      }
    }
  },
  {
    url: '/platform/delete/role',
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

        }
      }
    }
  },
  {
    url: '/platform/edit/role',
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

        }
      }
    }
  }

]
