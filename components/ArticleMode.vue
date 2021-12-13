<template>
  <div class="app-container">
    <div v-if="list.length" class="info-mode">
      <ArticleList v-for="(item,index) in list" :key="index" :item-data="item" :is-title="isTitle" />
      <Pagination :total="total" :pagesize="query.pageSize" :currentpage="query.pageNum" @onchange="handleChangePage" />
    </div>
    <el-empty v-else :image-size="200" />
  </div>
</template>

<script>
export default {
  name: 'ArticleMode',
  props: {
    isTitle: {
      type: Boolean,
      default: false
    },
    // pageIndex: {
    //   type: Number,
    //   default: null
    // },
    // keywords: {
    //   type: String,
    //   default: ''
    // },
    list: {
      type: Array,
      default: () => []
    },
    total: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      // list: [],
      query: {
        pageNum: 1,
        pageSize: 10,
        type: null,
        keywords: ''
      }
      // total: 0
    }
  },
  mounted () {
    // this.getList()
  },
  methods: {
    handleChangePage (val) {
      const { type, value } = val
      type ? this.query.pageNum = value : this.query.pageSize = value
      // this.getList()
      this.$emit('onPage', val)
    }
    // getList () {
    //   this.$api.article.getArticleList({ ...this.query, type: this.pageIndex, keywords: this.keywords }).then((res) => {
    //     this.total = res.data.data.total
    //     this.list = res.data.data.list
    //   })
    // }
  }
}
</script>

<style scoped lang="scss">

</style>
