<template>
  <div class="form-mode">
    <h3 class="form-title">
      用户登录
    </h3>
    <el-form ref="ruleForm" :model="form" :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户账号" prop="userName">
        <el-input v-model="form.userName" placeholder="请输入账号" />
      </el-form-item>
      <el-form-item label="用户密码" prop="userPwd">
        <el-input v-model="form.userPwd" placeholder="请输入密码" type="password" />
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <el-input v-model="form.code" placeholder="请输入验证码">
          <template slot="append">
            <span class="code-img" @click="refreshCode" v-html="codeImg" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="loading" @click="submitForm">
          立即登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      form: {
        userName: '',
        userPwd: '',
        code: ''
      },
      rules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        userPwd: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      },
      codeImg: ''
    }
  },
  head () {
    return this.$seo('用户登录页', '用户登录', [{ hid: 'keywords', name: 'keywords', content: '经济十分深刻' }])
  },
  created () {
    this.refreshCode()
  },
  methods: {
    submitForm () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.loading = true
          this.$api.user.login(this.form).then((res) => {
            // this.$message({
            //   message: '登录成功!',
            //   type: 'success'
            // })
            // 同步vuex && cookie
            this.$cookies.set('userInfo', res.data.data)
            this.$store.commit('user/SAVE_USER_INFO', res.data.data)
            if (!this.$route.query.path || /login|reg/.test(this.$route.query.path)) {
              this.$router.replace({ name: 'home' })
            } else {
              this.$router.replace(this.$route.query.path)
            }
          }).finally(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    refreshCode () {
      this.$api.user.getCode().then((res) => {
        this.codeImg = res.data.data
      })
    }
  }
}
</script>

<style scoped lang="scss">
.form-mode{
  width: 400px;
  margin: 0 auto;
  background: $white;
  padding: 15px;
  border-radius: 6px;

  .form-title{
    padding: 10px 0;
    text-align: center;
  }

  .code-img{
    cursor: pointer;
  }
}
</style>
