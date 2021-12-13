// state
export const state = () => ({
  homePage: 1,
  homePageSize: 10
})

// mutations
export const mutations = {
  SET_HOMEPAGE (state, data) {
    state.homePage = data
  },
  SET_HOMEPAGESIZE (state, data) {
    state.homePageSize = data
  }
}
// actions
export const actions = {

}
