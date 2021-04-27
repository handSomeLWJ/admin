<template>
  <div>
    <h1>WELCOME&gt;{{ userInfo.username }}</h1>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Welcome",
  components: {},
  props: {},
  data() {
    return {};
  },
  watch: {},
  computed: {
    ...mapState(["userInfo"]),
  },
  methods: {},
  created() {},
  mounted() {},
};
</script>
<style scoped lang="less">
h1 {
  font-size: 36px;
  font-weight: 600;
}
</style>