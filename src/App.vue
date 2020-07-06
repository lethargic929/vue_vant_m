<template>
  <div id="app">
    <!-- 路由占位符 -->
    <router-view />
  </div>
</template>

<script>
// import {login} from '@/api/index.js'

export default {
  name:"app"
  // created () {
  //  this.mylogin() 
  // },
  // methods:{
  //   async mylogin() {
  //     const res = await login()
  //     console.log(res)
  //   }
  // }
}
</script>

<style lang="less">
</style>
