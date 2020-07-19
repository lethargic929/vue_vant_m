<template>
  <div class="channal-edit">
    <van-cell title="我的频道" value="编辑" />
    <van-grid direction="horizontal" :gutter="10">
  <van-grid-item v-for="value in 8" :key="value" text="文字"></van-grid-item>
</van-grid>
<van-cell title="频道编辑" />
<van-grid direction="horizontal" :gutter="10">
  <van-grid-item v-for="value in 8" :key="value" text="文字"> <van-icon slot="icon" name="plus" /></van-grid-item>
</van-grid>
  </div>
</template>

<script>
export default {
  name: "list",
  // props:{
  //   userchannels:{
  //     type:Object,
  //     required:true
  //   }
  // },
  created () {
    console.log(this.userchannels)
  },
  methods:{}
};
</script>

<style lang="less" scoped>
.channal-edit {
  padding: 90px 20px;

  }
</style>
