import request from '@/utils/request.js'

// 文章列表请求数据
export const articleList = (params) => {
  return request({
    url:'/app/v1_1/articles',
    method:'get',
    params 
  });
}