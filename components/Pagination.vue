<template>
  <div class="page-mode">
    <el-pagination
      :current-page="currentpage"
      :page-sizes="pagesizes"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    pagesize: {
      type: [Number, String],
      default: 10
    },
    total: {
      type: [Number, String],
      default: 0
    },
    pagesizes: {
      type: Array,
      default: () => {
        return [10, 20, 50, 100]
      }
    },
    currentpage: {
      type: [Number, String],
      default: 1
    }
  },
  data () { return {} },
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.$emit('onchange', { type: 0, value: val })
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.$emit('onchange', { type: 1, value: val })
    }
  }
}
</script>

<style scoped lang="scss">
.page-mode{
    text-align: right;
    padding: 15px 0;
}
</style>
