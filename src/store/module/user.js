import {getItem,setItem} from '@/utils/storage.js'

export default {
  state: {
    user:getItem('TOKEN_KEY')
  },
  mutations:{
    setUser (state,data) {
      state.user = data
      setItem('TOKEN_KEY',state.user)
    }
  },
  actions: {}
}
