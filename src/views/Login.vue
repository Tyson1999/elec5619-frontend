<template>
  <div class="background"></div>
  <div class="login-form-container" v-loading="loading">
    <div class="logo"></div>
    <div class="one-word">{{one_word}}</div>
    <div class="login-form">
      <el-input v-model="email" placeholder="Email address" class="login-input" />
      <el-input v-model="password" placeholder="Password" class="login-input" type="password" />
      <Geetest @validate_success="validate_success" />
      <el-button type="primary" class="login-button" @click="login">Login</el-button>
      <div class="forget-password">
        <a href="#" class="forget-password">Forgot password?</a>
      </div>
<!--      <div class="social-login">-->
<!--        <el-button class="login-button">Continue with Google</el-button>-->
<!--        <el-button class="login-button">Continue with Facebook</el-button>-->
<!--        <el-button class="login-button">Continue with Twitter</el-button>-->
<!--      </div>-->
      <el-divider></el-divider>
      <div class="policy">
        You agree to follow our <a href="#"> Privacy Policy </a> and <a href="#"> Terms of Service </a> when login.
      </div>
    </div>
  </div>
</template>

<script>
// external random one word API
import {oneWord} from '@/api/index'
import {login} from '@/api/user'
import {setToken} from '@/utils/auth'
import Geetest from '@/components/Geetest'
import { ElMessage } from "element-plus"

export default {
  name: 'Login',
  components: {
    Geetest
  },
  data() {
    return {
      email: '',
      password: '',
      one_word: '',
      loading: false,
      captcha_res: ''
    }
  },
  created() {
    this.oneWord()
  },
  methods: {
    oneWord() {
      oneWord().then(res => {
        res = res['data']
        this.one_word = res['Content'] + ' 🌟'
      })
    },
    login() {
      this.loading = true
      const email = this.email
      const password = this.password
      const captcha_res = this.captcha_res
      if (email == '' || password == ''){
        ElMessage.error("Please enter your email and password")
        this.loading = false
        return;
      }
      if (captcha_res == ''){
        ElMessage.error("Please complete the captcha")
        this.loading = false
        return;
      }
      login({email, password, captcha_res})
          .then(res => {
            ElMessage.success(res['msg'])
            setToken(res['token'])
            this.$router.push('/')
          })
          .catch(err => console.log({err}))
          .finally(() => this.loading = false)
    },
    validate_success(res) {
      this.captcha_res = res
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
  /*background: #aaa;*/
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
  padding: 0 20px 0 20px;
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
