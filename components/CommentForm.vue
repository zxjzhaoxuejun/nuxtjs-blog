<template>
  <el-form ref="ruleForm" :model="form" class="demo-ruleForm">
    <el-form-item prop="content">
      <div class="content-info">
        <div v-if="isUser" class="user-img">
          <i class="el-icon-user-solid" />
        </div>
        <el-input v-model="form.content" placeholder="请输入" type="textarea" rows="4" />
      </div>
    </el-form-item>
    <el-form-item>
      <div class="footer-info" :class="{'m-l':isUser}">
        <div class="pic-map">
          <div @click="showEmoji">
            😀
          </div>
          <div v-show="isShowEmoji" class="check-emoji">
            <emoji @onChange="onChangeEmoji" />
          </div>
        </div>
        <el-button type="primary" size="mini" @click="submitForm('ruleForm')">
          发表
        </el-button>
      </div>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    isUser: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      form: {
        content: ''
      },
      isShowEmoji: false
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    submitForm () {
      const { userName, userId } = this.userInfo
      if (!this.form.content) {
        this.$message.error('请输入评论内容!')
        return false
      }
      const params = {
        content: this.form.content, // 内容
        userId,
        userName,
        articleId: this.$route.query.id // 文章id
      }
      this.$api.article.postComments(params).then((res) => {
        if (res.data.code === 200) {
          this.form.content = ''
          this.$message({
            type: 'success',
            message: res.data.msg
          })
          this.$emit('on-success')
        }
      })
    },
    showEmoji () {
      this.isShowEmoji = true
    },
    onChangeEmoji (val) {
      this.isShowEmoji = !this.isShowEmoji
      this.form.content = this.form.content + val
    }
  }
}
</script>

<style scoped lang="scss">
.demo-ruleForm{
    margin-top: 10px;

    .el-form-item{
        margin-bottom: 0;
    }

    .footer-info{
        height: 26px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 0;

        .pic-map{
            cursor: pointer;
            position: relative;

            .check-emoji{
              position: absolute;
              width: 300px;
              height: 300px;
              overflow-y: auto;
              padding:2px 10px;
              background: $white;
              border: 1px #eee solid;
              border-radius: 4px;
            }
        }
    }
    .m-l{
        margin-left: 55px;
    }
}
.content-info{
    display: flex;
    align-items: center;

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
        margin-right: 15px;
    }
}
</style>
