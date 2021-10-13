<template>
  <div class="background"></div>
  <div class="login-form-container">
    <div class="logo"></div>
    <div class="one-word">Spice up your creating process</div>
    <div class="login-form">
      <el-input v-model="email" placeholder="Email address" class="login-input"></el-input>
      <el-input v-model="password" placeholder="Password" class="login-input"></el-input>
      <el-button type="primary" class="login-button" @click="login()">Login</el-button>
      <div class="forget-password">
        <a href="#" class="forget-password">Forgot password?</a>
      </div>
      <div class="social-login">
        <el-button class="login-button">Continue with Google</el-button>
        <el-button class="login-button">Continue with Facebook</el-button>
        <el-button class="login-button">Continue with Twitter</el-button>
      </div>
      <el-divider></el-divider>
      <div class="policy">
        You agree to follow our <a href="#"> Privacy Policy </a> and <a href="#"> Terms of Service </a> when login.
      </div>
    </div>
  </div>
</template>

<script>
import {login} from '@/api/index'
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login() {
      const email = this.email
      const password = this.password
      login({email, password})
          .then(res => {
            console.log(res)
          })
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
  background: #aaa;
}

.login-form-container {
  text-align: center;
  background-color: hsla(0, 0%, 100%, .92);
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
