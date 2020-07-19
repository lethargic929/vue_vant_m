<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="isRefreshLoading"
      :success-text="refreshSuccessText"
      :success-duration="1500"
      @refresh="onRefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <article-item
          v-for="(article, index) in list"
          :key="index"
          :article="article"
        />
        <!-- <van-cell v-for="item in list" :key="item" :title="item" /> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { articleList } from "@/api/article.js";
import ArticleItem  from "@/components/ArticleItem.vue";
export default {
  name:'ArticleList',
  data() {
    return {
      list: [], // 存储列表数据的数组
      loading: false, // 控制加载中 loading 状态
      finished: false, // 控制数据加载结束的状态
      timestamp: null, // 请求获取下一页数据的时间戳
      error: false, // 控制列表加载失败的提示状态
      isRefreshLoading: false, // 控制下拉刷新的 loading 状态
      refreshSuccessText: "刷新成功" // 下拉刷新成功提示文本
    }
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  created() {},
  methods: {
    // 初始化或滚动到底部的时候会触发调用 onLoad
    async onLoad() {
      try {
        const { data } = await articleList({
          channel_id: this.channel.id, // 频道ID
          timestamp: this.timestamp || Date.now(), // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
          with_top: 1 // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
        });
        // 2. 把请求结果数据放到 list 数组中
        const { results } = data.data;
        // 数组的展开操作符，它会把数组元素一个一个拿出来
        this.list.push(...results);
        // 3. 本次数据加载结束之后要把加载状态设置为结束
        this.loading = false;
        // 4. 判断数据是否全部加载完成
        if (results.length) {
          // 更新获取下一页数据的时间戳
          this.timestamp = data.data.pre_timestamp;
        } else {
          // 没有数据了，将 finished 设置为 true，不再 load 加载更多了
          this.finished = true;
        }
      } catch (err) {
        // 展示错误提示状态
        this.error = true;

        // 请求失败了，loading 也需要关闭
        this.loading = false;
      }
    },
    // 当下拉刷新的时候会触发调用该函数
    async onRefresh() {
      try {
        const { data } = await articleList({
          channel_id: this.channel.id, // 频道ID
          timestamp: Date.now(), // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
          with_top: 1 // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
        });
        // 2. 将数据追加到列表的顶部
        const { results } = data.data;
        this.list.unshift(...results);
        // 3. 关闭下拉刷新的 loading 状态
        this.isRefreshLoading = false;
        // 更新下拉刷新成功提示的文本
        this.refreshSuccessText = `刷新成功，更新了${results.length}条数据`;
      } catch (err) {
        this.refreshSuccessText = `刷新失败`;
        this.isRefreshLoading = false;
      }
    }
  },
  components: {
   ArticleItem
  }
};
</script>

<style lang="less" scoped>
.article-list {
  position: fixed;
  top: 180px;
  bottom: 100px;
  overflow-y: auto;
  right: 0;
  left: 0;
 /deep/ .article-item {
  font-size: 0.3rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  }
  /deep/ .title {
    font-size: 0.3rem;
  }
 /deep/ .label-wrap {
    font-size: 0.22rem;
  }
}
</style>
