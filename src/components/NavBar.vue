<template>
  <div class="nav-container">
    <div class="logo"></div>
    <!-- User not login -->
    <div v-if="!isLogin">
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
import Avatar from './Avatar'
import { mapState } from 'vuex'
export default {
  name: 'NavBar',
  components: {
    Avatar
  },
  props: ['navBarType'],
  data() {
    return {
      searchContent: ''
    }
  },
  computed: {
    ...mapState({
      isLogin: state => state.avatar != ''
    })
  },
  watch: {
    navBarType(to) {
      console.log(to)
    },
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
