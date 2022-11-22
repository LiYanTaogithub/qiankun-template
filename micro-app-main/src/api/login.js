import request from '@/utils/request'

export function LOGIN(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    params: data
  })
}
export function getUserInfo() {
  return request({
    url: '/sys/user/currentUser',
    method: 'post'
  })
}
export function changePassword(data) {
  return request({
    url: '/sys/user/updatePwd',
    method: 'post',
    params: data
  })
}
