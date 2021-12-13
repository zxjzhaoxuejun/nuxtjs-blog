<template>
  <div>
    <article-mode :list="list" :total="total" @onPage="pageChange" />
  </div>
</template>

<script>
import { getArticleList } from './../../service/articleList'
export default {
  async asyncData (cxt) {
    const { total, list } = await getArticleList(cxt, 4)
    return {
      total,
      list
    }
  },
  data () { return {} },
  head () {
    return this.$seo('前端开发', '关注前端开发技术 ◆ 推动 HTML5 & CSS3 技术发展', [{ hid: 'keywords', name: 'keywords', content: 'CSS3,HTML5,js,前端开发,web' }])
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

<style scoped>

</style>
