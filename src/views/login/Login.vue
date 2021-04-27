<template>
  <div class="login">
    <div class="login_box">
      <!-- 图片 -->
      <div class="login_img">
        <img src="~assets/logo.png" alt="" />
      </div>
      <!-- 表单 -->
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        class="demo-ruleForm"
      >
        <el-form-item prop="username">
          <el-input
            type="text"
            v-model="loginForm.username"
            prefix-icon="iconfont icon-user"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            prefix-icon="iconfont icon-3702mima"
          ></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="getLogin">登录</el-button>
          <el-button type="info" @click="resetClick">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { reqLogin } from "../../network/api";
export default {
  name: "Login",
  components: {},
  props: {},
  data() {
    return {
      // 双向数据绑定
      loginForm: {
        username: "admin",
        password: "123456",
      },
      // 表单验证规则
      loginRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  watch: {},
  computed: {},
  methods: {
    ...mapMutations(["changeUserInfo"]),
    /* 点击登录 */
    getLogin() {
      this.$refs.loginForm.validate(async (valid) => {
        if (!valid) return;
        const { meta, data } = await reqLogin(this.loginForm);
        if (meta.status !== 200) return this.$message.error(meta.msg);
        this.$message.success(meta.msg);
        sessionStorage.setItem("token", data.token);
        this.changeUserInfo(data);
        this.$router.replace("/home");
      });
    },
    /* 点击重置 */
    resetClick() {
      this.$refs.loginForm.resetFields();
    },
  },
  created() {},
  mounted() {},
};
</script>
<style scoped lang="less">
.login {
  height: 100%;
  background-color: #2b4b6b;
  .login_box {
    position: absolute;
    width: 450px;
    height: 300px;
    background-color: #fff;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    border-radius: 10px;
    // 图片
    .login_img {
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 130px;
      height: 130px;
      padding: 10px;
      border: 10px solid #fff;
      box-shadow: 0 0 10px #ddd;
      border-radius: 50%;
      //   background-color: pink;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #eee;
        padding-top: 5px;
      }
    }
    // 表单
    .demo-ruleForm {
      width: 100%;
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 0 20px;
      box-sizing: border-box;
      .btns {
        text-align: right;
      }
    }
  }
}
</style>