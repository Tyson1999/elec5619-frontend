<template>
  <div id="app">
    <nav-bar :navBarType="navBarType"/>
    <div class="content-container">
      <router-view/>
    </div>
    <Footer/>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'

export default{
  components: {
    NavBar,
    Footer
  },
  data() {
    return {
      navBarType: 'login'
    }
  },
  watch: {
    '$route' (to){
      if (to['meta']['navBarType'] != 'register'){
        this.navBarType = 'login'
      } else {
        this.navBarType = 'register'
      }
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  position: relative;
  min-height: 100vh;
}

.content-container {
  margin: 0 auto;
  min-height: 100%;
}
</style>
