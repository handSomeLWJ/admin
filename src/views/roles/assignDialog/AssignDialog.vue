<template>
  <div>
    <el-dialog
      title="分配权限"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      @close="closeDialog"
    >
      <!-- :props="defaultProps" children: "children",
        label: "authName",  定义一个对象，对象里面有两个属性，属性名字是在请求过来的权限列表中获取 
        node-key="id":获取每个id
        defaultKeys：默认选中的选项，是一个数组，其实存放id-->
      <el-tree
        :data="rightAllList"
        show-checkbox
        :props="defaultProps"
        default-expand-all
        node-key="id"
        :default-checked-keys="defaultKeys"
        ref="tree"
      ></el-tree>

      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="submitClick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { reqRightAll, reqRolesRights } from "../../../network/api";
export default {
  name: "AssignDialog",
  components: {},
  props: ["editInfo"],
  data() {
    return {
      dialogFormVisible: false, //是否显示弹框
      rightAllList: [], //存储所有权限列表
      // tree循环的列表
      defaultProps: {
        children: "children",
        label: "authName",
      },
      defaultKeys: [], //默认选中的keys，存放id数组
    };
  },
  watch: {},
  computed: {},
  methods: {
    /* 点击x 或者取消 */
    closeDialog() {
      this.dialogFormVisible = false;
    },
    /* 点击确定 */
    async submitClick() {
      const { id: roleId } = this.editInfo;
      // 获取全选和半选中keys的数组的方法  rid包含获取所有被选中、叶子节点的key和半选中节点的key, 包括 1，2，3级节点
      const { getCheckedKeys, getHalfCheckedKeys } = this.$refs.tree;
      const rids = [...getCheckedKeys(), ...getHalfCheckedKeys()].join(",");
      const { meta } = await reqRolesRights(roleId, rids);
      if (meta.status !== 200) return this.$message.error(meta.msg);
      this.$message.success(meta.msg);
      this.$parent.getRolesList();
      this.dialogFormVisible = false;
    },
    /* 请求所有权限列表 */
    async getRightAll() {
      const { meta, data } = await reqRightAll("tree");
      if (meta.status !== 200) return;
      this.rightAllList = data;
    },
  },
  created() {},
  mounted() {},
};
</script>
<style scoped lang="less">
</style>