<template>
  <div class="form-mode">
    <h3 class="form-title">
      用户注册
    </h3>
    <el-form ref="ruleForm" :model="form" :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户账号" prop="userEmail">
        <el-input v-model="form.userEmail" placeholder="请输入账号" />
      </el-form-item>
      <el-form-item label="用户密码" prop="password">
        <el-input v-model="form.password" placeholder="请输入密码" type="password" />
      </el-form-item>
      <el-form-item label="确认密码" prop="password">
        <el-input v-model="form.password" placeholder="请输入密码" type="password" />
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <el-input v-model="form.code" placeholder="请输入验证码">
          <template slot="append">
            <span class="code-img" @click="refreshCode" v-html="codeImg" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">
          立即注册
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  beforeRouteLeave (to, from, next) {
    if (this.form.userEmail || this.form.password) {
      this.$messageBox.confirm('您确定要离开此页面?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        next(true)
      }).catch(() => {
        // 取消
      })
    } else {
      next(true)
    }
  },
  data () {
    return {
      form: {
        userEmail: '',
        password: '',
        code: ''
      },
      rules: {
        userEmail: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      },
      codeImg: ''
    }
  },
  created () {
    this.refreshCode()
  },
  methods: {
    submitForm () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          alert('submit!')
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
