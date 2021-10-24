<template>
  <div class="background"></div>
  <div class="login-form-container" v-loading="loading">
    <div class="logo"></div>
    <div class="one-word">Create an account</div>
    <div class="login-form">
      <el-input v-model="email" placeholder="Email address" class="login-input"></el-input>
      <el-input v-model="nickname" placeholder="Nickname" class="login-input"></el-input>
      <el-input v-model="password" placeholder="Password" class="login-input" type="password"></el-input>
      <el-input v-model="retype_password" placeholder="Retype password" class="login-input" type="password">></el-input>
      <el-button type="primary" class="login-button" @click="register">Sign up</el-button>
      <div class="forget-password">
        <a href="/login" class="forget-password">Already have an account?</a>
      </div>
<!--      <div class="social-login">-->
<!--        <el-button class="login-button">Continue with Google</el-button>-->
<!--        <el-button class="login-button">Continue with Facebook</el-button>-->
<!--        <el-button class="login-button">Continue with Twitter</el-button>-->
<!--      </div>-->
      <el-divider></el-divider>
      <div class="policy">
        You agree to follow our <a href="#"> Privacy Policy </a> and <a href="#"> Terms of Service </a> when sign up.
      </div>
    </div>
  </div>
</template>

<script>
import {register} from '@/api/user'
import {ElMessage} from 'element-plus'

export default {
  name: 'SignUp',
  data() {
    return {
      email: '',
      password: '',
      nickname: '',
      retype_password: '',
      loading: false
    }
  },
  methods: {
    register() {
      this.loading = true
      const email = this.email
      const password = this.password
      const retype_password = this.retype_password
      const username = this.nickname
      if (password != retype_password){
        ElMessage.error("Two passwords don't match")
        return;
      }
      if (email == '' || password == '' || username == '' || retype_password == ''){
        ElMessage.error("Please fill in the form")
        return;
      }
      register({email, password, username})
          .then(() => {
            ElMessage.success("Register successfully, you'll be jumped to the login page soon")
            this.clearForm()
            setTimeout(() => {
              this.$router.push('/login')
            }, 1500)
          })
          .catch(err => {
            console.log({err})
            this.clearForm()
          })
    },
    clearForm() {
      this.email = ''
      this.password = ''
      this.nickname = ''
      this.retype_password = ''
      this.loading = false
    }
  }
}
</script>

<style scoped>
.background {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: -1;
  background: url('~@/assets/background.jpeg') center / contain no-repeat;
}

.login-form-container {
  text-align: center;
  background-color: hsla(0, 0%, 85%, .92);
  width: 363px;
  border-radius: 10px;
  padding: 20px 0 40px 0;
  margin: 10vh auto;
}

.logo{
  background: url('~@/assets/logo.svg') center center no-repeat;
  width: 150px;
  height: 64px;
  margin: 0 auto;
}

.one-word{
  margin-top: -10px;
}

.login-form {
  padding: 20px;
}

.login-input {
  margin-top: 10px;
}

.login-button {
  width: 300px;
  height: 40px;
  border-radius: 30px;
  font-size: 16px;
  margin-top: 10px;
}

.forget-password{
  text-align: right;
}

.forget-password a {
  color: #5c5c5c;
  font-size: 12px;
  text-decoration: none;
}

.policy {
  font-size: 13px;
  margin-top: -10px;
}

.policy a {
  text-decoration: none;
}
</style>
