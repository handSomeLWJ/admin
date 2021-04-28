// import Vue from 'vue'
import { request } from './request'

/* 登录 login  post   */
export const reqLogin = (data) => request({ url: 'login', method: 'post', data })

/* 左侧菜单权限  menus  get  */
export const reqMenus = () => request({ url: 'menus' })

/* 用户列表  users  get */
export const reqUsers = (params) => request({ url: 'users', params })

/* 添加用户 users  post   */
export const reqAddUsers = (data) => request({ url: 'users', method: 'post', data })

/* 编辑用户 users/:id  put  */
export const reqEditUsers = ({ id, email, mobile }) => request({ url: 'users/' + id, method: 'put', data: { email, mobile } })

/* 修改用户状态  users/:uId/state/:type  put */
export const reqChangeState = (uId, type) => request({ url: `users/${uId}/state/${type}`, method: 'put' })

/* 删除单个用户 users/:id delete */
export const reqDeleteUser = (id) => request({ url: `users/${id}`, method: 'delete' })

/* 获取角色列表 roles get  */
export const reqRolesList = () => request({ url: 'roles' })

/* 分配用户角色 users/:id/role put id rid */
export const reqAssignUsersRoles = (id, rid) => request({ url: `users/${id}/role`, method: 'put', data: { rid } })