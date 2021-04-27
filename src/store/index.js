import Vue from 'vue'
import Vuex from 'vuex'
// 页面刷新之后，userInfo的数据也会消失，所以需要插件存储数据，其本质是使用本地存储
import persistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userInfo: {},
    },
    mutations: {
        changeUserInfo(state, data) {
            state.userInfo = data
        }
    },
    actions: {},
    modules: {},
    plugins: [persistedState()]
})