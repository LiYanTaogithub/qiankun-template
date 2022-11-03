import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
// import router from '@/router'
import { getToken } from '@/utils/auth'
import { reportHttpDuration, sentryHttpError } from '@/utils/sentry'

// create an axios instance
const service = axios.create({
  timeout: 120000, // request timeout
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: false // 允许携带cookie
})

// request interceptor
service.interceptors.request.use(
  config => {
    config.metadata = { startTime: new Date().getTime() }
    if (store.getters.token) {
      config.headers['X-Token'] = getToken()
    }

    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    response.config.metadata.endTime = new Date().getTime()
    reportHttpDuration(response)
    console.log('response.data.code', response.data.code)
    if (response.data.code == '001099') {
      Message({
        message: response.data.msg || 'Error',
        type: 'error',
        duration: 3 * 1000
      })
      // sentryHttpError(response)
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
