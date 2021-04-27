<template>
  <div class="home">
    <el-container>
      <el-header>
        <div class="logo">
          <img src="~assets/logo.png" alt="" />
          <h1>电商后台管理系统</h1>
        </div>
        <el-button type="info" @click="logout">退出</el-button>
      </el-header>
      <el-container>
        <el-aside :width="isCollapse ? '63px' : '200px'">
          <div class="toggleCollapse" @click="isCollapse = !isCollapse">
            |||
          </div>
          <el-menu
            class="el-menu-vertical-demo"
            background-color="#464d53"
            text-color="#fff"
            active-text-color="#ffd04b"
            unique-opened
            :collapse="isCollapse"
            :collapse-transition="false"
            router
            :default-active="activePath"
          >
            <el-submenu
              :index="item.id + ''"
              v-for="item in menusList"
              :key="item.id"
            >
              <template slot="title">
                <i :class="fontList[item.id]"></i>
                <span>{{ item.authName }}</span>
              </template>
              <el-menu-item-group
                v-for="citem in item.children"
                :key="citem.id"
              >
                <el-menu-item
                  :index="citem.path"
                  @click="clickItem(citem.path)"
                >
                  <i class="el-icon-menu"></i>{{ citem.authName }}
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-container>
          <el-main><router-view></router-view></el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { reqMenus } from "../../network/api";
import { mapMutations } from "vuex";
export default {
  name: "Home",
  components: {},
  props: {},
  data() {
    return {
      menusList: [], //左侧菜单列表
      //   左侧菜单字体图标
      fontList: {
        125: "iconfont icon-users",
        103: "iconfont icon-tijikongjian",
        101: "iconfont icon-shangpin",
        102: "iconfont icon-danju",
        145: "iconfont icon-baobiao",
      },
      isCollapse: false, //是否折叠
      activePath: "", //当前选中列表路径
    };
  },
  watch: {},
  computed: {},
  methods: {
    ...mapMutations(["changeUserInfo"]),
    /* 获取左侧菜单权限 */
    async getMenus() {
      const { data, meta } = await reqMenus();
      if (meta.status !== 200) return this.$message.error(meta.msg);
      this.menusList = data;
    },
    /* 点击退出按钮  清空vuex  清空storage 返回login  */
    logout() {
      this.changeUserInfo({});
      window.sessionStorage.clear();
      this.$router.replace("/login");
      this.$message.error("用户已注销");
    },
    /* 点击每一项菜单列表， */
    clickItem(path) {
      this.activePath = path;
      // 为了刷新后activePath的值还在，所以把path存入session中
      sessionStorage.setItem("activePath", path);
    },
  },
  created() {
    this.getMenus();
    /* 每次刷新都重新赋值路径给this.activePath */
    this.activePath = sessionStorage.getItem("activePath");
  },
  mounted() {},
};
</script>
<style scoped lang="less">
.home {
  height: 100%;
  .el-container {
    height: 100%;
    .el-header {
      background-color: #373d41;
      color: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .logo {
        display: flex;
        align-items: center;
        img {
          width: 55px;
          height: 55px;
        }
        h1 {
          font-weight: 700;
          font-size: 20px;
          margin-left: 30px;
        }
      }
    }
    .el-aside {
      height: 100%;
      background-color: #464d53;
      .el-menu {
        border-right: none;
      }
      .toggleCollapse {
        background-color: #4a5064;
        text-align: center;
        line-height: 25px;
        color: #fff;
        font-size: 12px;
        cursor: pointer;
      }
      .el-submenu {
        background-color: #333744;
      }
      .iconfont {
        margin-right: 10px;
      }
    }
  }
  .el-main {
    background-color: #eaedf1;
  }
}
</style>