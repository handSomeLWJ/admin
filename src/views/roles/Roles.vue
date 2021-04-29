<template>
  <div class="roles">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card>
      <el-row>
        <el-button type="primary" @click="addRole">添加角色</el-button></el-row
      >
      <el-row>
        <el-table :data="rolesList" style="width: 100%" border>
          <el-table-column type="expand">
            <template #default="{ row }">
              <el-row
                v-for="(item, index) in row.children"
                :key="item.id"
                class="b_border"
                :class="{ t_border: index === 0 }"
              >
                <el-col :span="5"
                  ><el-tag closable @close="deleteRoles(row, item.id)"
                    >{{ item.authName }}
                  </el-tag></el-col
                >
                <el-col :span="19">
                  <el-row v-for="citem in item.children" :key="citem.id">
                    <el-col :span="5">
                      <el-tag
                        closable
                        type="success"
                        @close="deleteRoles(row, citem.id)"
                        >{{ citem.authName }}</el-tag
                      >
                    </el-col>
                    <el-col :span="19">
                      <el-tag
                        closable
                        type="warning"
                        v-for="ccitem in citem.children"
                        :key="ccitem.id"
                        @close="deleteRoles(row, ccitem.id)"
                        >{{ ccitem.authName }}
                      </el-tag></el-col
                    >
                  </el-row>
                </el-col>
              </el-row>
            </template>
          </el-table-column>
          <el-table-column type="index" label="#"> </el-table-column>
          <el-table-column prop="roleName" label="角色名称"> </el-table-column>
          <el-table-column prop="roleDesc" label="角色描述"> </el-table-column>
          <el-table-column label="操作" width="300px">
            <template #default="{ row }">
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="editRoles(row)"
                >编辑</el-button
              >
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="deleteRolesClick(row)"
                >删除</el-button
              >
              <el-button
                type="warning"
                icon="el-icon-setting"
                size="mini"
                @click="assignClick(row)"
                >分配权限</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </el-card>
    <!-- 添加或者编辑角色 -->
    <add-or-edit-roles
      ref="refAddOrEdit"
      :editInfo="editInfo"
      @resetEditInfo="resetEditInfo"
    ></add-or-edit-roles>
    <!-- 分配权限 -->
    <assign-dialog ref="refAssign" :editInfo="editInfo"></assign-dialog>
  </div>
</template>

<script>
import { reqRolesList, reqDeleteRoles, reqDeleteRole } from "../../network/api";
import AddOrEditRoles from "./addOrEditRoles/AddOrEditRoles.vue";
import AssignDialog from "./assignDialog/AssignDialog.vue";
export default {
  name: "Roles",
  components: { AddOrEditRoles, AssignDialog },
  data() {
    return {
      rolesList: [], //角色列表
      editInfo: {}, //传递到AddOrEditRoles的信息
    };
  },
  methods: {
    /* 获取角色列表 */
    async getRolesList() {
      const { meta, data } = await reqRolesList();
      if (meta.status !== 200) return;
      this.rolesList = data;
    },
    /* 删除指定权限 提示一下是否要删除权限  删除后刷新展开的局部页面row.childre=data */
    async deleteRoles(row, rightId) {
      const result = await this.$confirm(
        "此操作将永久删除该用户, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => {
        console.log(err);
      });
      if (result !== "confirm") return;
      const { id: roleId } = row;
      const { meta, data } = await reqDeleteRoles(roleId, rightId);
      if (meta.status !== 200) return this.$message.error(meta.msg);
      this.$message.success(meta.msg);
      row.children = data;
    },
    /* 添加角色 */
    addRole() {
      this.editInfo = {};
      this.$refs.refAddOrEdit.dialogFormVisible = true;
    },
    /* 编辑角色 */
    editRoles(row) {
      this.editInfo = row;
      this.$refs.refAddOrEdit.dialogFormVisible = true;
    },
    /* 重新给editInfo赋值，在表单清除校验规则之后  watch能及时监听 */
    resetEditInfo() {
      this.editInfo = {};
    },
    /* 删除角色 */
    async deleteRolesClick(row) {
      const result = await this.$confirm(
        "此操作将永久删除该, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => {
        console.log(err);
      });
      if (result !== "confirm") return;
      const { id } = row;
      const { meta } = await reqDeleteRole(id);
      if (meta.status !== 200) return this.$message.error(meta.msg);
      this.$message.success(meta.msg);
      this.getRolesList();
    },
    /* 点击分配权限 获取所有权限列表赋值给 调用递归数组方法，然后传值到defaultKeys数组  获取权限列表树  */
    assignClick(row) {
      this.editInfo = row;
      this.getDefaultKeys(row, this.$refs.refAssign.defaultKeys);
      this.$refs.refAssign.dialogFormVisible = true;
      this.$refs.refAssign.getRightAll();
    },
    /* 递归 获取defaultKeys  data为循环的数据  arr为数组（id数组）  */
    getDefaultKeys(data, arr) {
      if (!data.children) return arr.push(data.id); //循环到data下没有了children则结束
      data.children.forEach((item) => {
        this.getDefaultKeys(item, arr);
      });
    },
  },
  created() {
    this.getRolesList();
  },
};
</script>

<style lang="less" scoped>
.b_border {
  border-bottom: 1px solid #eee;
}
.t_border {
  border-top: 1px solid #eee;
}
.el-row {
  display: flex;
  align-items: center;
}
.el-tag {
  margin: 10px;
}
</style>