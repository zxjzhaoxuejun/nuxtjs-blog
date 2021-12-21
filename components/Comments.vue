<template>
  <div class="comment-mode">
    <div class="comment-list">
      <h3 class="title">
        发表评论
      </h3>
      <comment-form :is-user="true" @on-success="successChange" />
    </div>
    <div class="comment-list">
      <h3 class="title">
        评论列表({{ commentList.length }}条)
      </h3>
      <comment-item v-for="(item,index) in commentList" :key="index" :item="item" @on-comment-change="successComment" />
    </div>
  </div>
</template>

<script>

import CommentForm from './CommentForm.vue'
import CommentItem from './CommentItem.vue'
export default {
  components: { CommentForm, CommentItem },
  props: {
    commentList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {

    }
  },
  methods: {
    successChange () {
      this.$emit('on-load')
    },
    successComment () {
      this.$emit('on-comment')
    }
  }

}
</script>

<style scoped lang="scss">
.comment-mode{
    // width: 60%;
    padding: 15px 0;
    border-top: 1px #ddd solid;

    .comment-list{
        padding: 10px 0;
    }

}
</style>
