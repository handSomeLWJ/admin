// import Vue from 'vue'
import { request } from './request'

/* 登录 login  post   */
export const reqLogin = (data) => request({ url: 'login', method: 'post', data })

/* 左侧菜单权限  menus  get  */
export const reqMenus = () => request({ url: 'menus' })

/* 用户列表  users  get */
export const reqUsers = (params) => request({ url: 'users', params })