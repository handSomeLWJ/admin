import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Login = () =>
    import ('../views/login/Login')
const Home = () =>
    import ('../views/home/Home')
const Welcome = () =>
    import ('../views/welcome/Welcome')
const Users = () =>
    import ('../views/users/Users')
const Roles = () =>
    import ("views/roles/Roles")
const Rights = () =>
    import ("views/rights/Rights")
const Goods = () =>
    import ("views/goods/Goods")
const Params = () =>
    import ("views/params/Params")
const Categories = () =>
    import ("views/categories/Categories")
const Orders = () =>
    import ("views/orders/Orders")
const Reports = () =>
    import ("views/reports/Reports")

const routes = [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login, name: 'Login' },
    {
        path: '/home',
        component: Home,
        name: 'Home',
        redirect: '/welcome',
        children: [
            { path: '/welcome', component: Welcome, name: 'Welcome' },
            { path: '/users', component: Users, name: 'Users' },
            { path: '/roles', component: Roles, name: 'Roles' },
            { path: '/rights', component: Rights, name: 'Rights' },
            { path: '/goods', component: Goods, name: 'Goods' },
            { path: '/params', component: Params, name: 'Params' },
            { path: '/categories', component: Categories, name: 'Categories' },
            { path: '/orders', component: Orders, name: 'Orders' },
            { path: '/reports', component: Reports, name: 'Reports' },
        ]
    },

]

const router = new VueRouter({
    mode: 'history',
    routes
})

/* 路由守卫 */
router.beforeEach((to, from, next) => {
    // 先判断是否进入login的其它地方，若是区login，则直接放行
    if (to.path != '/login') {
        // 若是去login外的其地方，则判断有没有token 没有则去login登录，有的话则放行
        if (!window.sessionStorage.getItem("token")) {
            next('/login')
        } else {
            next()
        }
    } else {
        next()
    }
})

export default router