<template>
  <div class="container">
    <div class="items">
      <a href="#">What's xxxx</a>
      <a href="#">FAQ</a>
      <a href="#">TOS</a>
      <a href="#">Privacy Policy</a>
      <a href="#">About us</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>
.container {
  background-color: rgb(43, 51, 60);
  color: white;
  padding: 12px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}

.items a{
  color: white;
  margin-left: 20px;
  font-weight: bold;
  font-size: 12px;
  text-decoration: none;
}
</style>
