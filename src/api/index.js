
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