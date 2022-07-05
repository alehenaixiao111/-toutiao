<template>
  <div class="login-container">
    <van-nav-bar title="登录" />
    <van-form @submit="onSubmit" ref="form">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="用户名"
        :rules="rules.mobile"
        required
        type="number"
        :maxlength="11"
      >
        <template #left-icon>
          <ToutiaoIcon icon="shouji" />
        </template>
      </van-field>
      <van-field
        v-model="user.code"
        name="code"
        placeholder="密码"
        :rules="rules.code"
        required
        type="number"
        :maxlength="6"
      >
        <template #left-icon>
          <ToutiaoIcon icon="yanzhengma" />
        </template>
        <template #button>
          <van-count-down
            @finish="isShowCountDown = false"
            v-if="isShowCountDown"
            :time="5000"
            format=" ss 秒"
          />
          <van-button
            v-else
            class="send-sms-btn"
            native-type="button"
            size="small"
            type="primary"
            @click="OnsendEmail"
            :loging="isDisabled"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, OnSendMsM } from "@/api/login";
import { Toast } from "vant";

export default {
  name: "LoginPage",

  props: {},
  data() {
    return {
      isDisabled: false,
      user: {
        mobile: "14332234961",
        code: "246810",
      },
      rules: {
        mobile: [
          {
            required: true,
            message: "手机号不能为空",
          },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "手机号格式不对",
          },
        ],
        code: [
          {
            required: true,
            message: "验证码不能为空",
          },
          {
            pattern: /^\d{6}$/,
            message: "验证码只能六位",
          },
        ],
      },
      isShowCountDown: false,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onSubmit() {
      try {
        const res = await login(this.user);
        console.log(res);
        Toast.success("登录成功");
      } catch (e) {
        console.log(e);
        Toast.fail(e?.response?.data?.message || "服务端错误");
      }
    },
    async OnsendEmail() {
      try {
        await this.$refs.form.validate("mobile");
      } catch (e) {
        return;
      }
      try {
        // 展示倒计时
        this.isDisabled = true;
        // 调用获取验证码接口 并且传参
        await OnSendMsM(this.user.mobile);
        this.isShowCountDown = true;
        Toast.success("获取验证码成功");
      } catch (e) {
        console.log(e);
        Toast.fail(e?.response?.data?.message || "出错了");
        this.isShowCountDown = false;
      } finally {
        this.isDisabled = false;
      }
    },
  },
};
</script>
<style scoped lang="less">
.login-container {
  /deep/.toutiao {
    font-size: 37px;
  }
}
.send-sms-btn {
  line-height: 46px;
  background-color: #ededed;
  font-size: 22px;
  color: #666;
}
</style>
