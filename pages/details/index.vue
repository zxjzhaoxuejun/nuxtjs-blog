<template>
  <div class="app-container">
    <div class="desc">
      <div class="desc-head">
        <div class="desc-title">
          {{ details.title }}
        </div>
        <div class="desc-info">
          <span>发布者：{{ details.auth }}</span>
          <span>时间：{{ filtersTime(details.createTime) }}</span>
          <span>阅读量：{{ details.views }}</span>
          <span>评论数：{{ details.comment }}</span>
          <span>推荐数：{{ details.recommend }}</span>
        </div>
      </div>
      <div class="desc-con" v-html="details.content" />
    </div>
  </div>
</template>

<script>
import { dateFormatting } from './../../plugins/filters'
export default {
  name: 'Details',
  async asyncData ({ route, app: { $api } }) {
    const { id } = route.query
    const res = await $api.article.getArticleDesc({ articleId: Number(id) })
    return { details: res.data.data.data }
  },
  data () {
    return {
      // details: {}
    }
  },
  created () {
    // this.getDetails()
  },
  methods: {
    // getDetails () {
    //   const { id } = this.$route.query
    //   this.$api.article.getArticleDesc({ articleId: Number(id) }).then((res) => {
    //     this.details = res.data.data.data
    //   })
    // },
    filtersTime (val) {
      return dateFormatting(val, 2)
    }
  }
}
</script>

<style scoped lang="scss">
.desc{
  padding: 20px;

  &-head{
    text-align: center;
    padding-bottom: 15px;
    border-bottom: 1px #eee solid;
  }
  &-title{
    font-size: 18px;
    font-weight: bold;
    color: $text-color;
  }
  &-info{
    color: $text-color2;
    padding: 10px 0;

    span{
      margin-right: 10px;
    }
  }
  &-con{
    padding: 20px 0;
    line-height: 26px;

    h1,h2,h3,h4{
      padding: 10px 0;
    }
  }
}
</style>
