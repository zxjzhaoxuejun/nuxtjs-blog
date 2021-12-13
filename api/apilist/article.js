export default $axios => ({
  saveArticle (data) {
    return $axios({
      url: '/api/article/save',
      method: 'post',
      data
    })
  },
  getArticleList (data) {
    return $axios({
      url: '/api/article/list',
      method: 'post',
      data
    })
  },
  getArticleDesc (data) {
    return $axios({
      url: '/api/article/details',
      method: 'post',
      data
    })
  }
})
