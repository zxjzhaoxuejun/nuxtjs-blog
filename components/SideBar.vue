<template>
  <div class="side-mode">
    <div class="side-list">
      <div class="side-list-item">
        <span class="side-list-item-name">昵称:</span>
        <span class="side-list-item-val">天空之城（冷血无情）</span>
      </div>
      <div class="side-list-item">
        <span class="side-list-item-name">园龄:</span>
        <span class="side-list-item-val">8年6个月</span>
      </div>
      <div class="side-list-item">
        <span class="side-list-item-name">粉丝:</span>
        <span class="side-list-item-val">1389</span>
      </div>
      <div class="side-list-item">
        <span class="side-list-item-name">关注:</span>
        <span class="side-list-item-val">23</span>
      </div>
    </div>
    <el-calendar v-model="dateValue" />
    <div class="side-list">
      <div class="side-list-title">
        搜索
      </div>
      <div class="side-list-item">
        <el-input v-model="keywords" placeholder="站内搜索" class="keyword-input" />
        <el-button type="primary" @click="onSearch">
          搜索
        </el-button>
      </div>
    </div>
    <div class="side-list">
      <div class="side-list-title">
        My Tags
      </div>
      <div class="side-list-item">
        <span class="side-list-item-name is-link">JavaScript(258)</span>
      </div>
      <div class="side-list-item">
        <span class="side-list-item-name is-link">HTML5(258)</span>
      </div>
      <div class="side-list-item">
        <span class="side-list-item-name is-link">CSS3(258)</span>
      </div>
      <div class="side-list-item">
        <span class="side-list-item-name is-link">Front-end Development</span>
      </div>
      <div class="side-list-item">
        <span class="side-list-item-name is-link">更多 <i class="el-icon-d-arrow-right" /></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dateValue: new Date(),
      keywords: ''
    }
  },
  methods: {
    onSearch () {
      this.$router.push({ name: 'search', query: { keywords: this.keywords } })
      this.keywords = ''
    }
  }
}
</script>

<style scoped lang="scss">
.side-mode{
  padding: 30px 20px;
  color: $text-color;

  .side-list{
    margin-top: 10px;
    &-title{
      font-weight: bold;
      font-size: 16px;
      color: $green;
      padding: 10px 0;
      // text-align: right;
    }
    &-item{
      display: flex;
      // justify-content: space-between;
      padding: 4px 0;
      &-name{
        color: $text-color2;
      }
      .is-link{
        cursor: pointer;
        &:hover{
          color: $green;
          font-weight: bold;
        }
      }
      &-val{
        color: $text-color;
        margin-left: 8px;
      }

      .keyword-input{
        width: 200px;
        margin-right: 20px;
      }
    }
  }
}
::v-deep .el-calendar-day{
  height: auto;
  text-align: center;
}
::v-deep .el-calendar{
  background: transparent;
}
::v-deep .el-calendar__body{
  padding: 12px;
}
</style>
