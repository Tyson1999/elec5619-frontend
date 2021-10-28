<template>
  <div class="footer-container">
    <div class="items">
      <a href="http://localhost:8080">What's Patronus</a>
      <a href="faq.html">FAQ</a>
      <a href="tos.html">TOS</a>
      <a href="privacy.html">Privacy Policy</a>
      <a href="about.html">About us</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>
.footer-container {
  background-color: rgb(43, 51, 60);
  color: white;
  padding: 12px;
  position: absolute;
  /*bottom: 0px;*/
  bottom: -100px;
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
