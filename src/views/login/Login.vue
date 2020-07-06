<template>
  <div class="loginIndex">
    <!-- 登录头部导航 -->
    <van-nav-bar class="page-nav-bar" title="登录" />
    <!-- /登录头部导航 -->
    <!-- 登录的表单页面 -->
    <van-form @submit="onSubmit" ref="loginForm">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        maxlength="11"
        type="number"
        :rules="userformRules.mobile"
        ><span slot="left-icon" class="iconfont icon-shouji"></span
      ></van-field>
      <van-field
        v-model="user.code"
        name="code"
        maxlength="6"
        type="number"
        placeholder="请输入验证码"
        :rules="userformRules.code"
        ><span slot="left-icon" class="iconfont icon-yanzhengma"></span>
        <template #button>
          <van-count-down
            v-if="isCountDownShow"
            :time="5000"
            slot="button"
            format="ss s"
            @finish="isCountDownShow = false"
          />
          <van-button
            v-else
            class="send-sms-btn"
            slot="button"
            round
            size="small"
            type="default"
            @click="send_yzm"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="info" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
    <!-- /登录的表单页面 -->
  </div>
</template>
<script>
import { login, send_yzm } from "@/api/index.js";
export default {
  name: "Login",
  data() {
    return {
      user: {
        mobile: "",
        code: ""
      },
      isCountDownShow: false,
      userformRules: {
        mobile: [
          {
            required: true,
            message: "手机号不能为空"
          },
          {
            pattern: /^1[3|5|7|8]\d{9}$/,
            message: "手机号格式不正确"
          }
        ],
        code: [
          {
            required: true,
            message: "验证码不能为空"
          },
          {
            pattern: /^\d{6}$/,
            message: "验证码格式不正确"
          }
        ]
      }
    };
  },
  methods: {
    async onSubmit(values) {
      // 登录中
      this.$toast.loading({
        duration: 0, // 持续时间，0表示持续展示不停止
        forbidClick: true, // 是否禁止背景点击
        message: "登录中..." // 提示消息
      });
      console.log("submit", values);
      try {
        const {data:res} = await login(this.user);
        console.log(res.data)
        this.$store.commit('setUser',res.data.token)
        this.$toast.success("登录成功")
        this.$router.push('/my')
      } catch (err) {
        console.log(err)
        if (err.response.status === 400) {
          this.$toast.fail("登录失败", err);
        } else {
          this.$toast.fail("登录失败，手机号或验证码错误");
        }
      }
    },
    // 点击验证码验证手机号
    async send_yzm() {
      // 1. 校验手机号
      try {
        await this.$refs.loginForm.validate("mobile");
      } catch (err) {
        return console.log("验证失败", err);
      }
      // 2. 验证通过，显示倒计时
      this.isCountDownShow = true;
      // 3. 请求发送验证码
      try {
        await send_yzm(this.user.mobile);
        this.$toast.success("发送成功");
      } catch (err) {
        this.isCountDownShow = false;
        if (err.response.status === 400) {
          this.$toast.fail("发送太频繁了，请稍后重试");
        } else {
          this.$toast.fail("发送失败，请稍后重试");
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
.loginIndex {
  .iconfont {
    font-size: 37px;
  }
  .send-sms-btn {
    width: 160px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
