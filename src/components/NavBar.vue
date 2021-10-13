<template>
  <div class="nav-container">
    <div class="logo"></div>
    <!-- User not login -->
    <div v-if="!logined">
      <div class="function" v-if="navBarType === 'login'">
        <div class="search">
          <el-input v-model="searchContent" placeholder="Search anything" prefix-icon="el-icon-search"></el-input>
        </div>
        <a href="/login">
          <div class="login">
            <el-button type="primary" round>Login</el-button>
          </div>
        </a>
      </div>
      <div v-else>
        <a href="/signUp">
          <div class="register">
            <el-button type="primary" round>Sign up</el-button>
          </div>
        </a>
      </div>
    </div>
    <!-- User login -->
    <div v-else class="avatar">
      <Avatar />
      <div class="search">
        <el-input v-model="searchContent" placeholder="Search anything" prefix-icon="el-icon-search"></el-input>
      </div>
    </div>
  </div>
</template>

<script>
import {userInfo} from '@/api/user'
import Avatar from './Avatar'
export default {
  name: 'NavBar',
  components: {
    Avatar
  },
  props: ['navBarType'],
  data() {
    return {
      searchContent: '',
      logined: false
    }
  },
  created() {
    userInfo()
        .then(res => {
          res = res['data']['data']
          const username = res['username']
          const role = res['role']
          const email = res['email']
          const avatar = res['avatar']
          this.$store.commit('setUser', {
            username,
            role,
            email,
            avatar
          })})
        .catch((err) => {console.log(err)})
  },
  watch: {
    navBarType(to) {
      console.log(to)
    }
  }
}
</script>

<style scoped>
.nav-container{
  /*background: antiquewhite;*/
  height: 64px;
  padding: 0px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo{
  background: url('~@/assets/logo.svg') center center no-repeat;
  width: 150px;
  height: 64px;
}

.function{
  display: flex;
  align-items: center;
}

.login, .register{
  margin: 0 30px 0 20px;
}

.avatar {
  display: flex;
}
</style>
