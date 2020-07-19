import Vue from 'vue'
import Vuex from 'vuex'
// import {getItem,setItem} from '@/utils/storage.js'
import user from '@/store/module/user.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // user:getItem(TOKEN_KEY)
  },
  mutations: {
    // setUser (state,data) {
    //   state.user = data
    //   setItem(TOKEN_KEY,state.user)
    // }
  },
  actions: {
  },
  modules: {
    user
  }
})
