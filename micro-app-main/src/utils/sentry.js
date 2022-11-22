// import sqSentry from '@shiqiao/sentry'

const sentryUrl = {
  development: {
    host: '10.20.9.108:9000'
  },
  test: {
    host: '10.20.9.108:9000'
  },
  uat: {
    host: '10.20.9.108:9000'
  },
  production: {
    host: 'sentry.shiqiao.com'
  }
}

function getSentryUrl () {
  const env = process.env.NODE_ENV
  return sentryUrl[env].host
}

// 响应时间
function responseTime (arg1, arg2) {
  return (arg1 - arg2) / 1000
}

function setHttpConfig (info) {
  // const IS_DEV_ENV = process.env.NODE_ENV === 'development'
  // if (IS_DEV_ENV) return
  let [url, path, method, request, requestHeader, response, responseHeader, startTime, endTime, duration] = []
  if (!info.config) {
    url = info.message
  } else {
    url = (info && info.request && info.request.responseURL) ? info.request.responseURL : undefined
    path = (info && info.config && info.config.path) ? info.config.path : undefined
    method = (info && info.config && info.config.method) ? info.config.method : undefined
    request = (info && info.config && info.config.data) ? info.config.data : {}
    requestHeader = (info && info.config && info.config.headers) ? info.config.headers : undefined
    response = (info && info.response && info.response.data ? info.response.data : undefined) || (info && info.data ? info.data : undefined)
    responseHeader = (info && info.response && info.response.headers ? info.response.headers : undefined) || (info && info.headers ? info.headers : undefined)

    startTime = info.config.metadata.startTime
    endTime = info.config.metadata.endTime
    duration = responseTime(endTime, startTime)
  }
  return {
    url,
    method,
    path,
    request,
    requestHeader,
    response,
    responseHeader,
    duration
  }
}

export function setSentryOption () {
  const env = process.env.NODE_ENV
  const url = getSentryUrl()
  const environment = env === 'production' ? 'production' : env
  let xieyi =  environment === 'production' ? 'https' : 'http'
  const options = {
    dsn: `${xieyi}://f43b403028484f72bf80b394391280e6@${url}/31`,
    environment
  }
  return options
}

export function reportHttpDuration (info) {
  const options = setHttpConfig(info)
  if (options.duration >= 3) {
    // sqSentry.reportHttpDuration(options)
  }
}

export function sentryHttpError(info) {
  const options = setHttpConfig(info)
  console.log('sentryOptions', options)
  // sqSentry.reportHttpError(options)
}