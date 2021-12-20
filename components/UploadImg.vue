<template>
  <el-upload
    class="avatar-uploader"
    :action="UPLOAD_URL"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :headers="headers"
  >
    <div class="logo-img">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon" />
    </div>
  </el-upload>
</template>

<script>
import { mapGetters } from 'vuex'
import { UPLOAD_URL } from './../config'
export default {
  name: 'UploadImg',
  props: {
    value: {
      type: String,
      required: true,
      default: ''
    },
    nowFileUrl: {
      type: String,
      default: ''
    },
    regular: {
      type: RegExp,
      default () {
        return /\.(jpeg|jpg|png)$/
      }
    },
    maxSize: {
      type: Number,
      default: 1024 * 1024 * 5
    }
  },
  data () {
    return {
      UPLOAD_URL
    }
  },

  computed: {
    imageUrl () {
      return this.value
    },
    ...mapGetters(['token']),
    headers () {
      return {
        Authorization: `Bearer ${this.token}`
      }
    }
  },
  methods: {
    emitInput (val) {
      this.$emit('input', val)
    },

    handleAvatarSuccess (res) {
      this.emitInput(res.data.filename)
    },
    beforeUpload (file) {
      const isJPG = this.regular.test(file.name)
      const isLt2M = file.size / this.maxSize
      if (!isJPG) {
        this.$message.error('Upload picture format error!')
      }
      if (!isLt2M) {
        this.$message.error('Upload picture size error!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style scoped lang="scss">
.avatar-uploader {
  display: inline-block;

  .logo-img{
      width: 120px;
      height: 120px;
      overflow: hidden;
      border: 1px solid #DDDDDD;
      i {
        width: 120px;
        font-size: 40px;
        color: #E0E0E0;
        line-height: 120px;
        text-align: center;
    }

    .avatar{
        max-width: 100%;
        height: auto;
    }
  }
}
</style>
