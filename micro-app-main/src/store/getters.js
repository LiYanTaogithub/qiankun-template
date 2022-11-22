const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  menus: state => state.user.menus,
  roleDepartment: state => state.user.rolename_params,
  addRouters: state => state.permission.addRouters,
  permission_routers: state => state.permission.routers,
  isFirstEnter: state => state.user.isFirstEnter,
  visitedViews: state => state.tagsView.visitedViews
}
console.log('menus', getters.menus)
export default getters
