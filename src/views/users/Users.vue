<template>
  <div class="users">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card class="box-card">
      <el-row>
        <el-col :span="8">
          <el-input
            placeholder="请输入搜索内容"
            v-model="params.query"
            clearable
            @clear="clearQuery"
          ></el-input>
        </el-col>
        <el-col :span="2">
          <el-button
            icon="el-icon-search"
            type="info"
            @click="searchClick"
            :disabled="params.query.length <= 0"
          ></el-button>
        </el-col>
        <el-col :span="4" :offset="2">
          <el-button type="primary" @click="addUser">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 表格 -->
      <el-table :data="userList" border style="width: 100%">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="email" label="邮箱"> </el-table-column>
        <el-table-column prop="mobile" label="电话"> </el-table-column>
        <el-table-column prop="role_name" label="角色"> </el-table-column>
        <el-table-column label="状态">
          <!-- 作用域插槽  .row能获取userList的数据 -->
          <template #default="{ row }">
            <el-switch v-model="row.mg_state"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="170">
          <!-- 点击编辑用户信息 并传row数据到userDialog -->
          <template #default="{ row }">
            <el-button
              type="primary"
              circle
              icon="el-icon-edit"
              @click="editUser(row)"
            ></el-button>
            <el-button type="danger" circle icon="el-icon-delete"></el-button>
            <el-button type="warning" circle icon="el-icon-setting"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 页码 -->
      <div class="block">
        <el-pagination
          :page-sizes="[2, 3, 5, 10]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalPage"
          @size-change="sizeChange"
          @current-change="currentChange"
          :current-page="params.pagenum"
        >
        </el-pagination>
      </div>
    </el-card>
    <user-dialog ref="refUserDialog"></user-dialog>
  </div>
</template>

<script>
import UserDialog from "../../../UserDialog.vue";
import { reqUsers } from "../../network/api";
export default {
  name: "Users",
  components: { UserDialog },
  props: {},
  data() {
    return {
      // 请求数据
      params: { query: "", pagenum: 1, pagesize: 2 },
      userList: [], //用列表的数据
      totalPage: 0, //用户列表总页数
      currentEdit: {}, //点击编辑按钮传信息到userDialog组件
    };
  },
  watch: {},
  computed: {},
  methods: {
    /* 获取用户列表数据 */
    async getUsers() {
      const { meta, data } = await reqUsers(this.params);
      if (meta.status !== 200) return;
      this.userList = data.users;
      this.totalPage = data.total;
    },
    /* @size-change="sizeChange"  此属性返回一个size数据 */
    sizeChange(size) {
      this.params.pagesize = size;
      this.getUsers();
    },
    /* 改变当前页 即是箭头改变和输入框改变 @current-change="currentChange" 此属性返回一个page数据*/
    currentChange(page) {
      this.params.pagenum = page;
      this.getUsers();
    },
    /* 点击搜索 从新获取一遍用户列表数据 默认搜索第一页 */
    searchClick() {
      this.getUsers();
    },
    /* 点击清除关键字   从新获取用户列表的第一页 */
    clearQuery() {
      (this.params.pagenum = 1), this.getUsers();
    },
    /* 点击添加用户  弹出userDialog  */
    addUser() {
      this.currentEdit = {};
      this.$refs.refUserDialog.dialogFormVisible = true;
    },
    /* 点击编辑用户信息  弹出userDialog 并传递row信息 */
    editUser(row) {
      this.currentEdit = row;
      this.$refs.refUserDialog.dialogFormVisible = true;
    },
  },
  created() {
    this.getUsers();
  },
  mounted() {},
};
</script>
<style scoped lang="less">
</style>