<template>
  <div>
    <el-dialog
      :title="isFromEdit ? '编辑角色' : '添加角色'"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      @close="closeDialog"
    >
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="ruleForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="ruleForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="submitClick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { reqEditRoles, reqAddRoles } from "../../../network/api";
export default {
  name: "AddOrEditRoles",
  components: {},
  props: ["editInfo"],
  data() {
    return {
      dialogFormVisible: false, //是否显示弹框
      //   表单数据绑定
      ruleForm: {
        roleName: "",
        roleDesc: "",
      },
      //   表单验证规则
      rules: {
        rolesName: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
        ],
      },
    };
  },
  computed: {
    /* 判断是否来自点击编辑 */
    isFromEdit() {
      return !!(this.editInfo.id || this.editInfo.roleName);
    },
  },
  methods: {
    /* 点击x或者取消  closeDialog   */
    closeDialog() {
      this.$refs.ruleForm.resetFields();
      this.$emit("resetEditInfo");
      this.dialogFormVisible = false;
    },
    /* 点击确定 首先判断表单有没有通过校验 */
    submitClick() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (!valid) return;
        const { id } = this.editInfo;
        if (this.isFromEdit) {
          // 点击编辑
          const { meta } = await reqEditRoles(id, this.ruleForm);
          if (meta.status !== 200) return this.$message.error(meta.msg);
          this.$message.success(meta.msg);
        } else {
          // 点击添加
          const { meta } = await reqAddRoles(this.ruleForm);
          if (meta.status !== 201) return this.$message.error(meta.msg);
          this.$message.success(meta.msg);
        }
        this.dialogFormVisible = false;
        this.$parent.getRolesList();
      });
    },
  },
  watch: {
    /* 当editInfo发生变化时  赋值给ruleForm */
    editInfo(newValue) {
      console.log(newValue);
      const { roleName, roleDesc } = newValue;
      this.ruleForm = { roleName, roleDesc };
    },
  },
};
</script>
<style scoped lang="less">
</style>