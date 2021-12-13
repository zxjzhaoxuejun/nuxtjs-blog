// state
export const state = () => ({
  token: '',
  userInfo: null
})

// mutations
export const mutations = {
  SET_TOKEN (state, data) {
    state.token = data
  },
  SAVE_USER_INFO (state, data) {
    const { token = '', ...obj } = data
    state.userInfo = obj
    state.token = token
  }
}
// actions
export const actions = {
  nuxtServerInit (store, context) {
    // 初始化信息到store当中
    console.log('nuxtServerInit')
  },
  saveUser ({ commit, state }, data) {
    // 异步处理
    commit('SET_TOKEN', data)
    commit('SAVE_USER_INFO', data)
  }
}
