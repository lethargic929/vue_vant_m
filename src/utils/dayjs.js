import Vue from 'vue'
import dayjs from 'dayjs'
// 加载中文语言
import 'dayjs/locale/zh-cn'
// 相对时间插件
import relativeTime from 'dayjs/plugin/relativeTime'

// 全局使用
dayjs.locale('zh-cn') 
dayjs.extend(relativeTime)

Vue.filter('relativeTime', value=>{
  return dayjs().from(dayjs(value))
})