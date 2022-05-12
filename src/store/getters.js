const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  managementType: state => state.app.managementType,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  userInfo: state => state.user.userInfo,
  info: state => state.user.info,
  chainType: state => state.user.chainType,
  permissionsRoutes: state => state.user.permissionsRoutes
}
export default getters
