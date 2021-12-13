export const getArticleList = async ({ $api, store }, type, keywords) => {
  let page = 1
  let pageSizes = 10
  if (process.client) {
    // console.log(cxt.store.state)
    const { homePage = null, homePageSize } = store.state.home
    page = homePage
    pageSizes = homePageSize
  }
  try {
    const querys = {
      pageNum: page || 1,
      pageSize: pageSizes || 10,
      type: type || null,
      keywords: keywords || ''
    }
    const res = await $api.article.getArticleList(querys)
    return {
      total: res.data.data.total,
      list: res.data.data.list
    }
  } catch (error) {
    console.log(error)
  }
}
