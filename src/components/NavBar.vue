<template>
  <div class="nav-container">
    <div class="logo"></div>
    <div v-if="!isLogin">
      <div class="function" v-if="navBarType === 'login'">
        <div class="search">
          <span class="a">
            <el-input v-model="searchContent" placeholder="Search anything" prefix-icon="el-icon-search"></el-input>
          </span>
          <span class="a">
            <el-button type="primary" @click="Search()" round>Search</el-button>
          </span>

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
        <span class="a">
          <el-input v-model="searchContent" placeholder="Search anything" prefix-icon="el-icon-search" ></el-input>
        </span>
        <span class="a">
          <el-button type="primary" @click="Search()" round>Search</el-button>
          <!-- <span>{{creatorList}}</span> -->
        </span>


      </div>
    </div>
  </div>
</template>

<script>
import Avatar from './Avatar'
import { mapState } from 'vuex'
import {searchName} from '@/api/user'

export default {
  name: 'NavBar',
  components: {
    Avatar
  },
  props: ['navBarType'],
  data() {
    return {
      searchContent: '',
      creatorList:[]
    }
  },
  methods: {
    Search() {
      const creator = this.searchContent
      searchName(creator)
        .then(res => {
          this.creatorList = JSON.stringify(res.data)
          this.$router.push({name: 'SearchCreator', params: {name: this.creatorList}})
          })
          .catch(err => {
            console.log({err})
          })

    },
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
  },



}
</script>

<style scoped>
.nav-container{
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

span.a {
  display: inline-block;
  margin-left: 10px;

}
</style>
