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
      <div><a @click="beCreator">Become creator</a></div>
      <div><a @click="logout">Log out</a></div>
    </div>
  </div>
</template>

<script>
import {changeRole} from '@/api/user'

export default {
  name: 'Avatar',
  data() {
    return {
      avatar: 'https://s.pximg.net/common/images/no_profile_s.png',
      hover: false
    }
  },
  methods: {
    beCreator() {
      changeRole()
        .catch(err => {
          console.log({err})
        })
      console.log('111')
    },
    logout() {
      console.log('111')
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
