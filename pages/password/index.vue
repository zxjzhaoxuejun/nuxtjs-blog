<template>
  <div class="form-mode">
    <h3 class="form-title">
      修改密码
    </h3>
    <el-form ref="ruleForm" :model="form" :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item label="旧密码" prop="oldPwd">
        <el-input v-model="form.oldPwd" placeholder="请输入旧密码" type="password" />
      </el-form-item>
      <el-form-item label="新密码" prop="userPwd">
        <el-input v-model="form.userPwd" placeholder="请输入新密码" type="password" />
      </el-form-item>
      <el-form-item label="确认密码" prop="notarizePwd">
        <el-input v-model="form.notarizePwd" placeholder="请输入确认密码" type="password" />
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <el-input v-model="form.code" placeholder="请输入验证码" maxlength="4">
          <template slot="append">
            <span class="code-img" @click="refreshCode" v-html="codeImg" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="loading" @click="submitForm">
          立即修改
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import sha1 from 'sha1'
import { Message } from 'element-ui'
export default {
  name: 'Password',
  data () {
    const checkNotarizePwd = (rule, value, callback) => {
      if (value !== this.form.userPwd) {
        callback(new Error('确认密码与输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      codeImg: '',
      form: {
        userPwd: '',
        notarizePwd: '',
        oldPwd: '',
        code: ''
      },
      rules: {
        oldPwd: [
          { required: true, message: '请输入旧密码', trigger: 'blur' }
        ],
        userPwd: [
          { required: true, message: '请输入新密码', trigger: 'blur' }
        ],
        notarizePwd: [
          { required: true, message: '请输入确认密码', trigger: 'blur' },
          { trigger: 'blur', validator: checkNotarizePwd }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.refreshCode()
  },
  methods: {
    submitForm () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.loading = true
          const { userPwd, oldPwd, code } = this.form
          this.$api.user.password({ code, userPwd: sha1(userPwd), oldPwd: sha1(oldPwd) }).then((res) => {
            if (res.data.code === 200) {
              Message({
                message: res.data.msg,
                type: 'success'
              })
              this.$router.push({ name: 'home' })
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
