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

/*  删除角色指定权限  roles/:roleId/rights/:rightId  delete */
export const reqDeleteRoles = (roleId, rightId) => request({ url: `roles/${roleId}/rights/${rightId}`, method: 'delete' })

/* 编辑角色  roles/:id  put  */
export const reqEditRoles = (id, data) => request({ url: `roles/${id}`, method: 'put', data })

/* 添加角色 roles  post  */
export const reqAddRoles = (data) => request({ url: `roles/`, method: 'post', data })

/* 删除角色 roles/:id delete */
export const reqDeleteRole = (id) => request({ url: `roles/${id}`, method: 'delete' })

/* 所有权限列表  rights/:type get  */
export const reqRightAll = (type) => request({ url: `rights/${type}`, })

/* 分配权限 roles/:roleId/rights */
export const reqRolesRights = (roleId, rids) => request({ url: `roles/${roleId}/rights`, method: 'post', data: { rids } })