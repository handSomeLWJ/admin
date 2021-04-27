import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入公共样式和字体图标
import './assets/css/reset.css'
import './assets/fonts/iconfont.css'

// 引入UI框架
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')