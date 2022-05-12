import { login, qrcodeLogin, logout } from '@/api/user'
import { getToken, setToken, getUserInfo, setUserInfo, removeAllAuthInfo, getInfo, getChianType, setChianType } from '@/utils/auth'
import { resetRouter } from '@/router'
import { Message } from 'element-ui'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    userInfo: getUserInfo() || null,
    info: getInfo() || null,
    permissionsRoutes: [],
    chainType: getChianType() || ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INFO: (state, info) => {
    state.info = info
  },
  SET_CHAIN_TYPE: (state, type) => {
    state.chainType = type
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_USER_INFO: (state, info) => {
    state.userInfo = info
  },
  SET_PERMISSIONS_ROUTES: (state, routes) => {
    state.permissionsRoutes = routes
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { email, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ email: email.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.auth_token)
        setToken(data.auth_token)
        commit('SET_USER_INFO', data)
        setUserInfo(data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  qrcodeLogin({ commit }, userInfo) {
    const { user_did, public_key } = userInfo
    return new Promise((resolve, reject) => {
      qrcodeLogin({ user_did, public_key }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.auth_token)
        setToken(data.auth_token)
        commit('SET_USER_INFO', data)
        setUserInfo(data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(async(res) => {
        if (res.header.code === 0) {
          await dispatch('resetToken')
          Message.success('Sign out and sign in successfully')
        } else {
          Message.error('Failed to log out')
          reject(res)
        }
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  setInfo({ commit }, userInfo) {
    commit('SET_INFO', userInfo)
  },
  setChainType({ commit }, type) {
    setChianType(type)
    commit('SET_CHAIN_TYPE', type)
  },
  setPermissionsRoutes({ commit }, routes) {
    commit('SET_PERMISSIONS_ROUTES', routes)
  },
  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      resetRouter()
      removeAllAuthInfo()
      commit('RESET_STATE')
      commit('SET_PERMISSIONS_ROUTES', [])
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

