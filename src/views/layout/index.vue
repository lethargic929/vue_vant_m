<template>
  <div class="layout-container">
    <router-view></router-view>
    <van-tabbar v-model="active" route>
  <van-tabbar-item class="iconfont icon-shouye" to="/home">首页</van-tabbar-item>
  <van-tabbar-item class="iconfont icon-wenda" to="/qa">问答</van-tabbar-item>
  <van-tabbar-item class="iconfont icon-shipin" to="/video">视频</van-tabbar-item>
  <van-tabbar-item class="iconfont icon-wode" to="/my">{{$store.state.user?'我的':'未登录'}}</van-tabbar-item>
</van-tabbar>
  </div>
</template>

<script>
export default {
  name:'layout',
 data() {
    return {
      active: 0,
    };
  }
}
</script>

<style lang="less" scoped>
.layout-container {
  .iconfont {
    font-size: 40px;
  }
}
</style>