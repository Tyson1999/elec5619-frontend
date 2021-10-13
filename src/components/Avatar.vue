<template>
  <div class="avatar-container">
    <div class="avatar" :style="{backgroundImage: 'url(' + avatar + ')'}" />
  </div>
</template>

<script>
export default {
  name: 'Avatar',
  data() {
    return {
      avatar: 'https://s.pximg.net/common/images/no_profile_s.png'
    }
  },
  methods: {

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
  background-image: url()
}
</style>
