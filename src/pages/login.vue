<template>
  <div id="login" style="background: #fff;">
    <span class="title block" style="padding-top: 46px;">账号密码登录</span>
    <van-cell-group>
      <van-field :left-icon="iconPeople" v-model="userName" placeholder="手机号" clearable></van-field>
      <van-field :left-icon="iconLock" v-model="userPwd" placeholder="密码" clearable />
    </van-cell-group>
    <span class="block text-align-right forget-password">忘记密码？</span>
    <div class="text-align-center">
      <van-button round type="info" style="width: 85%;" @click="login">登录</van-button>
    </div>
  </div>
</template>

<script>
import iconLock from "~/icon/lock-f.png";
import iconPeople from "~/icon/people.png";
import validator from "@/utils/validator";

export default {
  data() {
    return {
      iconLock,
      iconPeople,
      userName: "",
      userPwd: ""
    };
  },
  beforeMount() {
    this.$nextTick(() => {
      document.getElementById("login").style.height =
        document.body.clientHeight + "px";
    });
  },
  methods: {
    login() {
      if (!this.userName) {
        this.$widget.alert("请输入用户名",'');
        return;
      }
      if (!this.userPwd) {
        this.$widget.alert("请输入密码",'');
        return;
      }
      this.$post({
        isLoading: true,
        url: this.$apis.login,
        param: {
          userName: this.userName,
          userPwd: this.userPwd
        }
      }).then(res => {
        if (res.extra) {
          this.$store.commit("SET_USER_INFO", res.extra);
          //跳转到申请列表
          this.$router.push("/apply");
        }
      });
    }
  }
};
</script>


<style lang="scss">
#login {
  .title {
    font-family: "Arial", "Microsoft YaHei", "黑体", "宋体", sans-serif,
      PingFangSC-Regular;
    font-size: 6.7vw;
    color: #111111;
    letter-spacing: 2.2px;
    text-align: center;
    padding: 18px;
    font-weight: 400;
  }
  .van-icon {
    width: 24px;
    height: 24px;
  }
  .van-cell {
    // height: 40px;
    border-radius: 34px;
    border: 1px #ebebeb solid;
    padding: 6px;
    width: 85%;
    margin: 10px auto;
  }
  .van-hairline--top-bottom:after {
    border: none;
  }
  .forget-password {
    width: 90%;
    font-family: "Arial", "Microsoft YaHei", "黑体", "宋体", sans-serif,
      PingFangSC-Regular;
    font-size: 16px;
    color: #666666;
    letter-spacing: 0;
  }
  .van-button--info {
    color: #fff;
    background-color: #00c691;
    border: 1px solid #00c691;
    margin-top: 60px;
  }
  .van-button {
    font-family: "Arial", "Microsoft YaHei", "黑体", "宋体", sans-serif,
      PingFangSC-Regular;
    font-size: 17px;
    color: #ffffff;
    letter-spacing: 2.2px;
    text-align: left;
    text-align: center;
  }
}
</style>