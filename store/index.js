// 主模块
// state
export const state = () => ({

})

// mutations
export const mutations = {

}
// actions
export const actions = {
  nuxtServerInit (store, { app: { $cookies } }) {
    console.log(434)
    // 初始化信息到store当中,强制刷新后，nuxtServerInit钩子取出cookie
    // console.log($cookies.get('userInfo'))
    const userInfo = $cookies.get('userInfo') ? $cookies.get('userInfo') : { data: null }
    store.commit('user/SAVE_USER_INFO', userInfo)
    console.log('nuxtServerInit=>' + JSON.stringify(userInfo))
  }
}
