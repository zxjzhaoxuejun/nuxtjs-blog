<template>
  <div class="app-container">
    <article-mode :is-title="true" :list="list" :total="total" @onPage="pageChange" />
  </div>
</template>

<script>
// import ArticleList from '../components/ArticleList'
// import Pagination from '~/components/Pagination'
import { getArticleList } from './../../service/articleList'
export default {
  name: 'Home',
  async asyncData (context) {
    // Client-side
    const { total, list } = await getArticleList(context)
    return {
      total, list
    }
  },
  data () {
    return {
    }
  },
  head () {
    return this.$seo('首页', '关注前端开发技术 ◆ 推动 HTML5 & CSS3 技术发展', [{ hid: 'keywords', name: 'keywords', content: 'CSS3,HTML5,js,前端开发,web' }])
  },
  methods: {
    pageChange (info) {
      // console.log(info)
      const { type, value } = info
      if (type) {
        this.$store.commit('home/SET_HOMEPAGE', value)
      } else {
        this.$store.commit('home/SET_HOMEPAGESIZE', value)
      }
      this.$nextTick(() => {
        this.$nuxt.refresh()
      })
    }
  }
}
</script>
