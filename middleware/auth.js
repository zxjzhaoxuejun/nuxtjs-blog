export default ({ store, route, redirect, params, query, req, res }) => {
  // context服务端上下文
  // 全局守卫业务
  // store状态树信息
  // route一条目标路由信息
  // redirect强制跳转
  // params,query校验参数合理性
  console.log('middleware nuxt.config outside')
  // console.log(store, route)
}
