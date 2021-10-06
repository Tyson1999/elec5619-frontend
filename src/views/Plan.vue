<template>
  <div class="container">
    <div class="title">
      Join and support {{artist}}
    </div>
    <div class="support-detail">

    </div>
  </div>
</template>

<script>
export default {
  name: 'Plan',
  data() {
    return {
      artist: 'Test',
      avatar: ""
    }
  }
}
</script>

<style scoped>
.container {
  background: rgb(240, 242, 247);
  height: 100%;
}

.title {
  font-size: 20px;
  padding: 40px 15px;
  font-weight: bold;

}

.support-detail {
  background: #fff;

}
</style>
