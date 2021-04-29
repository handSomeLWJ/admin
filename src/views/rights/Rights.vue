<template>
  <div class="">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片显示权限列表 -->
    <el-card>
      <el-table border :data="rightList" style="width: 100%">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="authName" label="权限名称"></el-table-column>
        <el-table-column prop="path" label="路径"></el-table-column>
        <el-table-column label="权限等级">
          <template #default="{ row }">
            <el-tag v-if="row.level == 0">一级</el-tag>
            <el-tag type="success" v-else-if="row.level == 1">二级</el-tag>
            <el-tag type="warning" v-else>三级</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { reqRightAll } from "../../network/api";
export default {
  name: "",
  data() {
    return {
      rightList: [],
    };
  },
  methods: {
    async getRightAll() {
      const { meta, data } = await reqRightAll("list");
      if (meta.status !== 200) return this.$message.error(meta.msg);
      this.rightList = data;
    },
  },
  created() {
    this.getRightAll();
  },
};
</script>

<style lang="less" scoped>
</style>