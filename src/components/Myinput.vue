<template>
 <div class="my-input">
   <input type="text" placeholder="请输入内容" v-model="input" :disabled='true'>
 </div>
</template>

<script>
export default {
  name:'ArticleItem',
data () {
  return {
    input:''
  }
},
methods: {
  handle (val) {
    console.log(val,11)
  }
}
}
</script>

<style lang='less' scoped>
.my-input {
  margin: 0;
  width: 600px;
}
</style>