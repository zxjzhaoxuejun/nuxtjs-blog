<template>
  <div class="article-mode">
    <div class="article-list">
      <div v-if="isTitle" class="article-list-head">
        {{ itemData.createTime|dateFormatting }}
      </div>
      <div class="article-list-title" @click="goDetails(itemData.articleId)">
        {{ itemData.title }}
      </div>
      <div class="article-list-desc">
        <span>摘要：</span>{{ itemData.desc }}
        <span class="is-link" @click="goDetails(itemData.articleId)">阅读全文</span>
      </div>
      <div class="article-list-footer">
        <span>posted @ {{ filtersTime(itemData.createTime) }} 天空之城（冷血无情）</span>
        <span class="is-link">阅读（{{ itemData.views }}）</span>
        <span class="is-link" @click="handleComment">评论（{{ itemData.comment }}）</span>
        <span class="is-link" @click="handlePush">推荐（{{ itemData.recommend }}）</span>
        <!-- 博主显示 -->
        <span v-if="userInfo.userEmail=='zhaoxuejun@dhgate.com'" class="is-link" @click="handleEdit(itemData.articleId)">编辑</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { dateFormatting } from './../plugins/filters'
export default {
  name: 'ArticleList',
  props: {
    isTitle: {
      type: Boolean,
      default: false
    },
    itemData: {
      type: Object,
      default: () => {}
    }
  },
  data () { return {} },
  computed: {
    ...mapGetters(['token', 'userInfo'])
  },
  methods: {
    handleComment () {
      // 评论
      if (!this.token) {
        this.$router.replace('/login?path=' + this.$route.fullPath)
        return false
      }
    },
    filtersTime (val) {
      return dateFormatting(val, 2)
    },
    handlePush () {
      // 推荐
      if (!this.token) {
        this.$router.replace('/login?path=' + this.$route.fullPath)
        return false
      }
    },
    handleEdit (id) {
      // 编辑
      if (!this.token) {
        this.$router.replace('/login?path=' + this.$route.fullPath)
        return false
      }
      this.$router.push({ name: 'edit-details', query: { id } })
    },
    goDetails (id) {
      this.$router.push({ name: 'details', query: { id } })
    }
  }
}
</script>

<style scoped lang="scss">
.article-mode{
    padding: 10px;

    .article-list{
        padding: 15px 0;
        border-bottom: 1px $green dashed;

        &-head{
            font-weight: bold;
            font-size: 16px;
            color: $text-color;
            text-align: center;
            margin-bottom: 15px;
        }

        &-title{
            font-size: 14px;
            font-weight: bold;
            color: $green;
            cursor: pointer;

            &:hover{
                color: $yellow;
            }
        }

        &-desc{
            color: $text-color1;
            font-size: 12px;
            padding: 10px 0;
            min-height: 60px;
        }

        &-footer{
            font-size: 12px;
            color: $text-color2;
            text-align: right;
            margin-top: 20px;
        }
        .is-link{
            cursor: pointer;
            // text-decoration: underline;
            &:hover{
                color: $green;
            }
        }
    }
}
</style>
