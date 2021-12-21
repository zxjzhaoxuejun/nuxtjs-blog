<template>
  <div class="comment-list-item">
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
          <span v-if="showFooter" @click="reply(item)"><i class="el-icon-chat-dot-square" /> 回复</span>
          <el-tooltip v-else class="item" effect="dark" content="二级评论不开放回复功能!" placement="top">
            <span>
              <i class="el-icon-warning-outline" /> 提示
            </span>
          </el-tooltip>
          <span :class="{'active':item.likeStatus&&item.likeStatus.isLike}" @click="handleLike(item)">点赞 ({{ item.like }})</span>
        </div>
      </div>
      <comment-item v-for="(childItem,index) in item.replyList" :key="index" :show-footer="false" :item="childItem" @on-comment-change="successReply" />
      <comment-form v-if="item.replyStatus" :is-reply="true" :reply-id="item._id" :reply-placeholder="item.userName" @on-success="successReply" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { dateFormatting } from './../plugins/filters'
export default {
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    showFooter: {
      type: Boolean,
      default: true
    }
  },
  data () { return {} },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    filtersTime (val) {
      return dateFormatting(val, 2)
    },
    handleLike (item) {
      // 点赞
      const { _id, likeStatus } = item
      const { userId } = this.userInfo
      const isLike = likeStatus ? !likeStatus.isLike : true
      const postParams = {
        commentId: _id,
        userId,
        isLike
      }
      this.$api.article.postLike(postParams).then((res) => {
        this.$emit('on-comment-change')
      })
    },
    handleWarning () {
      // 二级评论不能回复
    },
    reply (item) {
      // 回复
      console.log(item)
      item.replyStatus = true
      this.$set(this.item)
    },
    successReply () {
      this.$emit('on-comment-change')
    }
  }
}
</script>

<style scoped lang="scss">
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
</style>
