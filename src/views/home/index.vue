<template>
  <div class="home-container">
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button
        class="search-btn"
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
        to="/search"
        >搜索</van-button
      >
    </van-nav-bar>

    <van-tabs class="channel-tabs" v-model="active" swipeable>
      <van-tab v-for="item in channels" :title="item.name" :key="item.id">
        <!-- 文章列表 -->
        <article-list :channel="item" />
      </van-tab>
      <div slot="nav-right" class="placeholder"></div>
        <div
          slot="nav-right"
          class="hamburger-btn"
          @click="isChannelEditShow = true"
        >
          <i class="iconfont icon-weibiaoti6"></i>
        </div>
    </van-tabs>
    <!-- /文章频道列表 -->
    <van-popup
      v-model="isChannelEditShow"
      position="bottom"
      class="channel-edit-popup"
      closeable
      close-icon-position="top-left"
      get-container="body"
      :style="{height: '100%'}"
    >
      <list
        :user-channels="channels"
        :active="active"
        @close="isChannelEditShow = false"
      />
    </van-popup>
  </div>
</template>

<script>
import ArticleList from "@/components/ArticleList.vue";
import list from "./list";
import { mapState } from "vuex";
import { getItem } from "@/utils/storage";
import { getUserChannels } from "@/api/index.js";
export default {
  name: "home",
  data() {
    return {
      active: 0,
      channels: [], // 频道列表
      isChannelEditShow: false
    };
  },
  watch: {
    user() {
      this.active = 0;
      this.loadChannels();
    }
  },
  created() {
    this.loadChannels();
  },
  methods: {
    async loadChannels() {
      if (this.$store.state.user.user) {
        // 已登录，请求获取线上的用户频道列表数据
        const { data } = await getUserChannels();
        console.log(data);
        this.channels = data.data.channels;
      } else {
        // 没有登录，判断是否有本地存储的频道列表数据
        const localChannels = getItem("user-channels");
        // 如果有本地存储的频道列表则使用
        if (localChannels) {
          this.channels = localChannels;
        }
        // } else {
        //   // 用户没有登录，也没有本地存储的频道，那就请求获取默认推荐的频道列表
        //   const { data } = await getUserChannels()
        //   this.channels = data.data.channels
        // }
      }
      // 把处理好的数据放到 data 中以供模板使用
      // console.log(this.channels)
    }
  },
  computed: {
    ...mapState(["user"])
  },
  components: {
    ArticleList,
    list
  }
};
</script>

<style lang="less" scoped>
.home-container {
  // padding-top: 174px;
  padding-bottom: 100px;
  /deep/ .van-nav-bar__title {
    max-width: none;
  }
  .search-btn {
    width: 555px;
    height: 64px;
    background: #5babfb;
    border: none;
    .van-icon {
      font-size: 32px;
    }
    .van-button__text {
      font-size: 28px;
    }
  }
  /deep/ .channel-tabs {
    padding-top: 92px;
    .van-tabs__wrap {
      height: 82px;
    }
    .van-tab {
      min-width: 200px;
      border-right: 1px solid #edeff3;
      font-size: 30px;
      color: #777;
      // border-bottom: 1px solid #edeff3;
    }
    .van-tab--active {
      color: #333;
    }
    .van-tabs__nav {
      padding-bottom: 0;
    }
    .van-tabs__line {
      bottom: 8px;
      width: 31px !important;
      height: 6px;
      background: #3296fa;
    }
  }
  .placeholder {
    flex-shrink: 0;
    width: 66px;
    height: 82px;
  }
  .hamburger-btn {
    position: fixed;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 66px;
    height: 82px;
    background-color: #fff;
    opacity: 0.902;
    .iconfont {
      font-size: 33px;
    }
    &:before {
      content: "";
      position: absolute;
      left: 0;
      width: 1px;
      height: 100%;
      background-image: url(~@/assets/gradient-gray-line.png);
      background-size: contain;
    }
  }
}
</style>
