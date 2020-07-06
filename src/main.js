import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引用路由文件
import axios from 'axios'

// 引入vant和样式
import Vant from 'vant'
import 'vant/lib/index.css'

// 引入全局样式
import '@/styles/index.less'

// vant提示信息
import { Toast } from 'vant'
Vue.use(Toast)

// 加载动态设置rem的基准值
import 'amfe-flexible'

Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
