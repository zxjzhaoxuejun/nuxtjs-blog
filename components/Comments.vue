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
      <div v-for="item in commentList" :key="item._id" class="comment-list-item">
        <div class="user-img">
          <i class="el-icon-user-solid" />
        </div>
        <div class="item-con">
          <div class="user-name">
            {{ item.userName }}
          </div>
          <div class="commemt-con">
            {{ item.content }}
          </div>
          <div class="comment-footer">
            <span class="footer-time">{{ filtersTime(item.createTime) }}</span>
            <div class="footer-action">
              <span @click="reply"><i class="el-icon-chat-dot-square" />回复</span>
              <span :class="{'active':item.likeStatus.isLike}" @click="handleLike(item)">点赞 ({{ item.like }})</span>
            </div>
          </div>
          <!-- <comment-form /> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CommentForm from './CommentForm.vue'
import { dateFormatting } from './../plugins/filters'
export default {
  components: { CommentForm },
  props: {
    commentList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      userImg: 'gf'
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    reply () {
      // 回复
    },
    filtersTime (val) {
      return dateFormatting(val, 2)
    },
    successChange () {
      this.$emit('on-load')
    },
    handleLike (item) {
      // 点赞
      const { _id, likeStatus } = item
      const { userId } = this.userInfo
      const isLike = !likeStatus.isLike
      const postParams = {
        commentId: _id,
        userId,
        isLike
      }
      this.$api.article.postLike(postParams).then((res) => {
        this.$emit('on-comment')
      })
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

    .comment-list-item{
        display: flex;
        padding: 15px 0;

        .user-img{
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border: 1px #eee solid;
            background: $white;
            color: $tagBgColor;
            font-size: 18px;
            font-weight: bold;
        }

        .item-con{
            flex: 1;
            margin-left: 15px;
        }

        .user-name{
            font-size: 14px;
            font-weight: bold;
            color: $text-color;
        }

        .commemt-con{
            color: $text-color1;
            line-height: 24px;
            padding: 10px 0;
        }

        .comment-footer{
            display: flex;
            justify-content: space-between;
            color: $text-color2;
        }

        .footer-action span{
            margin-left: 15px;
            cursor: pointer;
            &:hover{
                color: $green;
            }
        }
        .active{
          color: $green;
        }
    }
}
</style>
