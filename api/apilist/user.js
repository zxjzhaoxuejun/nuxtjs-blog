export default axios => ({
  getCode () {
    return axios({
      url: '/api/users/code-captcha',
      method: 'get'
    })
  },
  login (data) {
    return axios({
      url: '/api/users/login',
      method: 'post',
      data
    })
  },
  password (data) {
    return axios({
      url: '/api/users/password',
      method: 'post',
      data
    })
  }
})
