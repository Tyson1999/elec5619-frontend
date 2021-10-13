<template>
  <div class="container">
    <div class="bg">
    </div>
    <h3>Page not found</h3>
    <br>
    <h4>You will be redirected to the home page soon</h4>
  </div>
</template>

<script>
export default {
  name: '404',
  mounted() {
    setTimeout(() => {
      this.$router.push('/')
    }, 3000)
  }
}
</script>

<style scoped>
.bg {
  background: url('~@/assets/image-404.png') center / contain no-repeat;
  padding-top: 30%;
  margin-top: 30px;
}
</style>
