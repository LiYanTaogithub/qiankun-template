import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import router from '@/router'
import { getToken, removeToken } from '@/utils/auth'
import { reportHttpDuration, sentryHttpError } from '@/utils/sentry'

// create an axios instance
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  baseURL: '/insurance-sys-web',
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 120000, // request timeout
  headers: {
    'Content-Type': 'application/json'
    // 'Content-Type': 'multipart/form-data'
  },
  withCredentials: true // 允许携带cookie
})
console.log('baseURL', process.env.VUE_APP_BASE_API)

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    config.metadata = { startTime: new Date().getTime() }
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['X-Token'] = getToken()
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
  response => {
    response.config.metadata.endTime = new Date().getTime()
    reportHttpDuration(response)
    if (response.data.code == 0) {
      Message({
        message: response.data.msg || 'Error',
        type: 'error',
        duration: 3 * 1000
      })
      sentryHttpError(response)
      return Promise.reject(new Error(response.data.msg || 'Error'))
    } else if (response.data.code == 401) {
      sentryHttpError(response)
      store.dispatch('resetToken')
      router.replace({ path: '/login' })
      location.reload()
    } else if (response.data.code == 403) {
      sentryHttpError(response)
      Message({
        message: response.data.msg || 'Error',
        type: 'error',
        duration: 3 * 1000
      })
      return Promise.reject(new Error(response.data.msg || 'Error'))
    } else {
      return response
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    if (error.config) {
      error.config.metadata.endTime = new Date().getTime
      reportHttpDuration(error)
    }
    sentryHttpError(error)
    return Promise.reject(error)
  }
)

export default service
