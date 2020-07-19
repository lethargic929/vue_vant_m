<template>
  <div class="my-container">
    <!-- 已登录头部 -->
    <div class="header user-info" v-if="user.user">
      <div class="my-header">
        <van-image
          class="mobile-img"
          round
          fit="cover"
          :src="userInfo.photo"
        />
        <span class="name">{{userInfo.name}}</span>
        <van-button type="default" round>编辑资料</van-button>
      </div>
      <div class="header-text">
        <div class="header-item">
          <span class="count">{{userInfo.art_count}}</span>
          <span class="text">头条</span>
        </div>
        <div class="header-item">
          <span class="count">{{userInfo.follow_count}}</span>
          <span class="text">关注</span>
        </div>
        <div class="header-item">
          <span class="count">{{userInfo.fans_count}}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="header-item">
          <span class="count">{{userInfo.like_count}}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
    <!-- /已登录头部 -->
    <!-- 未登录 -->
    <div class="header" v-else @click="$router.push('/login')">
      <div class="header-nav">
          <van-image
            class="mobile-img"
            round
            fit="cover"
            src="~@/assets/mobile.png" />
        <span class="name">登录/注册</span>
         </div>
      </div>
    <!-- /未登录 -->
    <van-grid :column-num="2" class="grid-box" clickable>
      <van-grid-item>
        <span class="iconfont icon-shoucang"></span>
        <span class="text">收藏</span>
      </van-grid-item>
      <van-grid-item>
        <span class="iconfont icon-lishi"></span>
        <span class="text">历史</span>
      </van-grid-item>
    </van-grid>
    <van-cell title="消息通知" is-link />
    <van-cell title="小智同学" is-link />
    <van-button
      type="default"
      size="large"
      v-if="user.user"
      @click="onLogout"
      >退出登录</van-button
    >
  </div>
</template>

<script>
import {getUserInfo} from '@/api/index.js'
import {mapState,mapMutations} from 'vuex'

export default {
  name:'my',
  data() {
    return {
      isShow: false,
      userInfo:{}
    }
  },
  computed:{
    ...mapState(['user'])
  },
  created () {
      // 如果用户登录了，则请求加载用户信息数据
      // console.log(this.$store.state.user.user)
    // if (this.$store.state.user.user) {
      this.loadUserInfo()
    // }
  },
  methods: {
     ...mapMutations(['setUser']),
      async loadUserInfo () {
      try {
        console.log(123)
        const {data} = await getUserInfo()
        console.log(data,111)
        this.userInfo = data.data
      }catch (err) {
        console.log(err)
        this.$toast('获取数据失败，请稍后重试')
      }
    },
    onLogout() {
      // 退出提示
      // 在组件中需要使用 this.$dialog 来调用弹框组件
      this.$dialog
        .confirm({
          title: "确认退出吗？"
        })
        .then(() => {
          // on confirm
          // 确认退出：清除登录状态（容器中的 user + 本地存储中的 user）
          this.$store.commit("setUser", null);
        })
        .catch(() => {
          // on cancel
          console.log("取消执行这里");
        });
    }
   
  }
};
</script>

<style lang="less" scoped>
.my-container {
  .header {
    height: 361px;
    background: url("~@/assets/banner.png");
    background-size: cover;
      .header-nav {
        display: flex;
        flex-direction: column;
      justify-content: center;
         align-items: center;
       .mobile-img{
          width: 132px;
          height: 132px;
          margin-bottom: 15px;
          border: 4px solid #fff;
          // box-sizing: border-box;
        }
        .name {
          font-size: 30px;
          color: #fff;
        }
      }
  
    .my-header {
      display: flex;
      height: 231px;
      padding: 76px 32px 23px;
      box-sizing: border-box;
      justify-content: space-between;
      align-items: center;
      color: #fff;
      .mobile-img {
        width: 132px;
        height: 132px;
        margin-bottom: 15px;
        border: 4px solid #fff;
      }
      .name {
        font-size: 30px;
      }
    }
  }
  .header-text {
    display: flex;
    .header-item {
      flex: 1;
      height: 130px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #fff;
      .count {
        font-size: 36px;
      }
      .text {
        font-size: 23px;
      }
    }
  }
  .grid-box {
     height: 141px;
    .van-grid-item {
      height: 141px;
      .iconfont {
        font-size: 45px;
      }
      .text {
        font-size: 30px;
      }
    }
  }
}
</style>
