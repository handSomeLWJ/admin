<template>
  <div>
    <el-dialog
      title="分配角色"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      @close="colseRightDialog"
      ><el-row>
        <el-col>当前用户是：{{ setUserInfo.username }}</el-col>
      </el-row>
      <el-row style="margin: 20px 0">
        <el-col>当前角色是：{{ setUserInfo.role_name }}</el-col>
      </el-row>
      <el-row>
        <el-col
          >分配角色
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in rolesList"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="colseRightDialog">取 消</el-button>
        <el-button type="primary" @click="submitClick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { reqAssignUsersRoles } from "../../../network/api";
export default {
  name: "RightDialog",
  props: ["rolesList", "setUserInfo"], //用户权限角色列表,设置此用户的信息
  components: {},
  data() {
    return {
      value: "", //当前角色id
      dialogFormVisible: false, //是否显示dialog
    };
  },
  watch: {},
  computed: {},
  methods: {
    /* 点击x  和点击取消 */
    colseRightDialog() {
      this.dialogFormVisible = false;
    },
    /* 点击确定 先判断有没有选择上，关闭弹框  刷新页面用户列表 */
    async submitClick() {
      if (!this.value) return this.$message.error("请先选择角色");
      const { id } = this.setUserInfo;
      const rid = this.value;
      const { meta } = await reqAssignUsersRoles(id, rid);
      if (meta.status !== 200) return this.$message.error(meta.msg);
      this.$message.success(meta.msg);
      this.dialogFormVisible = false;
      this.$parent.getUsers();
    },
  },
  created() {},
  mounted() {},
};
</script>
<style scoped lang="less">
</style>