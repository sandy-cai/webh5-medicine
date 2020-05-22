<template>
  <div id="login" style="background: #fff;">
    <span class="title block">账号密码登录</span>
    <van-cell-group>
      <van-field v-model="phone" label="文本" left-icon="contact" placeholder="手机号" />
      <van-field v-model="password" label="文本" left-icon="lock" placeholder="密码" />
    </van-cell-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      phone: "",
      password: ""
    };
  }
};
</script>


<style lang="scss">
#login {
  .title {
    font-family: "Arial", "Microsoft YaHei", "黑体", "宋体", sans-serif,
      PingFangSC-Regular;
    font-size: 18px;
    color: #111111;
    letter-spacing: 2.2px;
    text-align: center;
    padding: 18px;
    font-weight: 400;
  }
}
</style>