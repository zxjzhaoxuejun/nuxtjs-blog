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
  },
  postArticleImg (data) {
    return $axios({
      url: '/api/upload/article-img',
      method: 'post',
      data
    })
  },
  postComments (data) {
    return $axios({
      url: '/api/comment/save',
      method: 'post',
      data
    })
  },
  postCommentsList (data) {
    return $axios({
      url: '/api/comment/list',
      method: 'post',
      data
    })
  },
  postLike (data) {
    return $axios({
      url: '/api/comment/like',
      method: 'post',
      data
    })
  }
})
