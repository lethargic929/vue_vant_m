
import request from '@/utils/request.js'
 
// axios.defaults.baseURL = "http://ttapi.research.itcast.cn/"

// 查询门户接口
export const login = (data) => {
  return request({
    url:'/app/v1_0/authorizations',
    method:'post',
    data 
  });
}
// 验证码发送请求
export const send_yzm = (data) => {
  return request({
    url:`/app/v1_0/sms/codes/${data}`,
    method:'get'
  });
}
// 获取用户自己的信息
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user'
  })
}
// 获取用户频道列表
export const getUserChannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels'
  })
}