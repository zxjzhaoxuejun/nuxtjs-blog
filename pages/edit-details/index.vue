<template>
  <div class="app-container">
    <el-form ref="ruleForm" :model="form" :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item label="文章分类" prop="type">
        <el-select v-model="form.type" placeholder="请选择文章分类">
          <el-option label="JavaScript" :value="1" />
          <el-option label="HTML5" :value="2" />
          <el-option label="CSS3" :value="3" />
          <el-option label="Front-end" :value="4" />
        </el-select>
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" placeholder="请输入文章标题" />
      </el-form-item>
      <el-form-item label="文章摘要" prop="desc">
        <el-input v-model="form.desc" type="textarea" maxlength="300" placeholder="请输入文章摘要" show-word-limit />
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <div id="article_content" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="save-btn" @click="save">
          立即保存
        </el-button>
        <el-button @click="resetForm('ruleForm')">
          重置
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { UPLOAD_URL } from './../../config'
export default {
  name: 'EditDetails',
  data () {
    return {
      form: {
        content: '',
        title: '',
        type: null,
        desc: ''
      },
      rules: {
        content: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择文章分类', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请输入文章摘要', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['token'])
  },
  mounted () {
    this.init_wangeditor()
  },
  methods: {
    init_wangeditor () {
      const _self = this
      const editor = this.$wangeditor('#article_content')
      // 配置图片上传服务器地址
      // editor.config.uploadImgServer = UPLOAD_URL
      editor.config.uploadImgHeaders = {
        enctype: 'multipart/form-data'
      }
      editor.config.uploadImgParams = {
        enctype: 'multipart/form-data'
      }
      // editor.config.uploadFileName = 'file'
      editor.config.customUploadImg = function (resultFiles, insertImgFn) {
        // resultFiles 是 input 中选中的文件列表
        // insertImgFn 是获取图片 url 后，插入到编辑器的方法
        const file = resultFiles[0]
        const formData = new FormData()
        formData.set('file', file)
        formData.set('name', file.name)
        _self.$api.article.postArticleImg(formData).then((res) => {
          // 上传图片，返回结果，将图片插入到编辑器中
          // console.log(res.data.filename)
          insertImgFn(res.data.data.filename)
        })
      }
      editor.config.onchange = (html) => {
        this.form.content = html
      }
      editor.create()
    },
    save () {
      console.log(this.form)
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$api.article.saveArticle(this.form).then((res) => {
            this.$message({
              message: res.data.msg,
              type: 'success'
            })
            this.resetForm()
            this.$router.push({ name: 'home' })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm () {
      this.$refs.ruleForm.resetFields()
    }
  }
}
</script>

<style scoped lang="scss">
.save-btn{
    margin-top: 20px;
}
</style>
