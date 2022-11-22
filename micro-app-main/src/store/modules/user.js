import { logout, getInfo, getRouterData } from '@/api/user'
import { LOGIN } from '@/api/login'

import router from '@/router'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
// import { constantRoutes } from '@/routerManuaConfig'
import md5 from 'js-md5'
import { resolve } from 'core-js/fn/promise'
// import sqSentry from '@shiqiao/sentry'
const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    changePwd_params: {
      visible: false
    }, // 修改密码弹窗 - 相关参数
    rolename_params: {
      name: '',
      empid: '',
      department: '',
      roleName: ''
    },
    isFirstEnter: true,
    menus: [
      {
        key: "Home",
        title: "主页",
        path: "/"
      },
      {
        key: "BusinessManageMicroApp",
        title: "Vue 主页",
        path: "/vue"
      },
      {
        key: "BusinessManageMicroAppList",
        title: "Vue 列表页",
        path: "/vue/list"
      },
      {
        key: "ReactMicroApp",
        title: "线索询价",
        path: "/insuranceinquiry"
      },
      {
        key: "ReactMicroAppList",
        title: "React 列表页",
        path: "/react/list"
      },
      {
        key: "AngularMicroApp",
        title: "Angular 主页",
        path: "/angular"
      },
      {
        key: "AngularMicroAppList",
        title: "Angular 列表页",
        path: "/angular/list"
      },
      {
        key: "StaticMicroApp",
        title: "Static 微应用",
        path: "/static"
      }
    ]
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    CHANGE_PWD: (state, { params }) => {
      state.changePwd_params = params
    },
    CLOSE_CHANGE_PWD: state => {
      state.changePwd_params = {
        visible: false
      }
    },
    SET_ROLENAME: (state, params) => {
      state.rolename_params = params
    },
    SET_ENTER: (state, params) => {
      state.isFirstEnter = params
    }
  },

  actions: {
    // user login
    Login({ commit }, userInfo) {
      const { username, password } = userInfo
      console.log('password', md5(password))
      return new Promise((resolve, reject) => {
        LOGIN({ username: username.trim(), password: md5(password) })
          .then(response => {
            console.log('data', response)
            const { data } = response
            commit('SET_TOKEN', data.obj)
            setToken(data.obj)
            // sqSentry.setUserId(username)
            window._fas && window._fas.setUserId(username)
            resolve(data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // get user info
    getInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo()
          .then(response => {
            const { data } = response
            if (!data) {
              reject('Verification failed, please Login again.')
            }
            const { name } = data.obj
            console.log('data.obj', data.obj)
            commit('SET_NAME', name)
            resolve(data.obj)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // get user info
    getRouter({ commit, state }) {
      return new Promise((resolve, reject) => {
        getRouterData()
          .then(response => {
            const { data } = response
            // console.log('路由信息', data)
            resolve(data)
          })
          .catch(error => {
            console.error('getRouter Error:', error)
            reject(error)
          })
      })
    },
    getMenu() {
      resolve()
    },
    // user logout
    logout({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token)
          .then(() => {
            commit('SET_TOKEN', '')
            removeToken()
            resetRouter()
            resolve()
            window.location.reload()
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // remove token
    resetToken({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}
console.log('user', user.state.menus)
export default user

// export default {
//   namespaced: true,
//   state,
//   mutations,
//   actions
// }
