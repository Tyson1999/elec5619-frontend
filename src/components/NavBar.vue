<template>
  <div class="nav-container">
    <div class="logo"></div>
    <!-- User not login -->
    <div v-if="!logined">
      <div class="function" v-if="navBarType === 'login'">
        <div class="search">
          <el-input v-model="searchContent" placeholder="Search Creators and tags" prefix-icon="el-icon-search"></el-input>
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
      <div class="search">
        <el-input v-model="searchContent" placeholder="Search Creators and tags" prefix-icon="el-icon-search"></el-input>
      </div>
      <Avatar />
    </div>
  </div>
</template>

<script>
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
