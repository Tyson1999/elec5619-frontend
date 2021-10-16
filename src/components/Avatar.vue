<template>
  <div style="position: relative;">
    <div style="display: flex;" @click="hover = !hover">
      <div class="avatar-container">
        <div class="avatar" :style="{backgroundImage: 'url(' + avatar + ')'}" />
      </div>
      <div
          style="
          transform: rotate(90deg) scale(1,1.4);
          margin-right: 30px;
          margin-left: -8px;
          font-weight: bold;
          color: #666;
          font-size: 12px">
        >
      </div>
    </div>
    <div class="personal-list" v-if="hover">
      <div><a href="/userprofile">Personal setting</a></div>
      <div><a @click="changeRole">Become {{role}}</a></div>
      <div><a @click="logout">Log out</a></div>
    </div>
  </div>
</template>

<script>
import {ElMessage} from 'element-plus'
import {changeRole} from '@/api/user'
import {removeToken} from '@/utils/auth'

export default {
  name: 'Avatar',
  data() {
    return {
      hover: false
    }
  },
  methods: {
    changeRole() {
      changeRole()
        .then(res => {
          ElMessage.success(res['msg'])
          this.$store.dispatch('getUserInfo')
        })
        .catch(err => {
          console.log({err})
        })
    },
    logout() {
      removeToken()
      this.$router.push('/')
      this.$router.go(0)
    }
  },
  computed: {
    role() {
      return this.$store.state.role == 'user' ? 'creator' : 'user'
    },
    avatar() {
      return this.$store.state.avatar
    }
  }
}
</script>

<style scoped>
.avatar-container {
  border-radius: 50%;
  overflow: hidden;
  width: 40px;
  height: 40px;
}

.avatar{
  height: 100%;
  width: 100%;
  background: center / contain no-repeat;
}

.personal-list {
  position: absolute;
  top: 50px;
  display: flex;
  flex-direction: column;
  background: #fff;
  z-index: 99;
  width: 100px;
}

.personal-list div {
  padding: 5px;
  font-size: 14px;
}

.personal-list div a {
  text-decoration: none;
  color: #2c3e50;
  cursor: pointer;
}
</style>
