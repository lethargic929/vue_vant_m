<template>
  <div class="my-container">
    <!-- 头部 -->
    <div class="header user-info">
    <div class="my-header">
      <van-image
        round
        width="66px"
        height="66px"
        src="https://img.yzcdn.cn/vant/cat.jpeg"
      />
      <span>11</span>
      <van-button type="default" round>编辑资料</van-button>
      </div>
      <van-grid>
        <van-grid-item icon="photo-o" text="头条" />
        <van-grid-item icon="photo-o" text="关注" />
        <van-grid-item icon="photo-o" text="粉丝" />
        <van-grid-item icon="photo-o" text="获赞" />
      </van-grid>
    </div>
    <!-- /头部 -->
<van-grid :column-num="2">
  <van-grid-item>
    <span class="iconfont icon-shoucang"></span>
    <span>收藏</span>
  </van-grid-item>
  <van-grid-item>
    <span class="iconfont icon-lishi"></span>
    <span>历史</span>
  </van-grid-item>
</van-grid>
<van-cell title="消息通知" is-link />
<van-cell title="小智同学" is-link />
<van-button type="default" size="large">退出登录</van-button>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.my-container {
  .header {
    height: 361px;
    background: url("~@/assets/banner.png");
    background-size: cover;
  }
}
</style>
