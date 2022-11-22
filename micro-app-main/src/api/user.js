import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/sys/user/currentUser',
    method: 'post'
  })
}

export function logout() {
  return request({
    url: '/sys/logout',
    method: 'post'
  })
}
export function getRouterData(token) {
  return request({
    url: '/sys/resources/findMenuByUser',
    method: 'post'
  })
}
// 获取动态路由
// export function getRouterData(token) {
//   return request({
//     url: '/sys/resources/findMenuByUser',
//     method: 'post'
//   })
// }
