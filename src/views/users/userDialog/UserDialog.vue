<template>
  <div>
    <el-dialog
      :title="isFromEdit ? '编辑用户' : '添加用户'"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      :before-close="beforeClose"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="refRuleForm"
        label-width="100px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            type="text"
            v-model="ruleForm.username"
            :disabled="isFromEdit"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" v-if="!isFromEdit">
          <el-input type="password" v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input type="email" v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="ruleForm.mobile"></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="submitForm">确定</el-button>
          <el-button @click="beforeClose">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { checkMobile } from "../../../utils/FromRules/index";
import { reqAddUsers, reqEditUsers } from "../../../network/api";
export default {
  name: "UserDialog",
  props: ["currentEdit"], //users传过来的用户信息
  components: {},
  data() {
    return {
      // 表单规则验证
      rules: {
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
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { type: "email", message: "请输入正确的邮箱地址", trigger: "blur" },
        ],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: checkMobile, trigger: "blur" },
        ],
      },
      dialogFormVisible: false, //是否显示dialog
      // urleForm赋初始值
      ruleForm: {
        username: "",
        password: "",
        email: "",
        mobile: "",
      },
    };
  },
  computed: {
    /* 判断是否点击了编辑 */
    isFromEdit() {
      const { id, username } = this.currentEdit;
      return !!(id || username);
    },
  },
  methods: {
    /* 点击x 和点击取消   关闭校验  关闭弹框  $emit请求父组件在点击关闭的时候清除currentEdit */
    beforeClose() {
      this.$refs.refRuleForm.resetFields();
      this.$emit("clearCurrentEdit");
      this.dialogFormVisible = false;
    },
    /* 点击 确定 */
    submitForm() {
      // 首先通过表单校验
      this.$refs.refRuleForm.validate(async (valid) => {
        if (!valid) return this.$message.error("表单验证不通过");
        // 编辑用户
        if (this.isFromEdit) {
          const { id } = this.currentEdit;
          const { mobile, email } = this.ruleForm;
          const { meta } = await reqEditUsers({ id, mobile, email });
          if (meta.status !== 200) return this.$message.error(meta.msg);
          this.$message.success(meta.msg);
        } else {
          // 添加用户
          const { meta } = await reqAddUsers(this.ruleForm);
          if (meta.status !== 201) return this.$message.error(meta.msg);
          this.$message.success(meta.msg);
        }
        this.dialogFormVisible = false;
        this.$refs.refRuleForm.resetFields();
        this.$parent.getUsers();
      });
    },
  },
  created() {},
  /* 监听currentEdit 但是存在一定的问题  第二次点击同一个的时候，currentEdit并没有改变 */
  watch: {
    currentEdit(newValue) {
      const { username, email, mobile } = newValue;
      this.ruleForm = { username, email, mobile, password: "" };
    },
  },
};
</script>
<style scoped lang="less">
.btns {
  text-align: right;
}
</style>