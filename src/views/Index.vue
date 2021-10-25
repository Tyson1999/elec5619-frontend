<template>
  <div class="container">
    <div class="one-word">
      <img src="~@/assets/logo.svg">
<!--      <p>FANBOX is a community where creators can receive continuous support from their fans.</p>-->
    </div>
    <div class="recommendations">
      <div v-for="artist in recommendArtists"
           class='recommend-artist'
           :key="artist">
        <a :href="'/artist/' + artist['user_id']">
          <div class="artistBg" :ref="'artistBg' + artist['username']"></div>
          <div class="artistInfo">
            <div class="artistAvatar" :ref="'artistAvatar' + artist['username']"></div>
            <div class="artistName">
              {{artist.username}}
            </div>
          </div>
        </a>
      </div>
    </div>
    <div class="findArtist">
      <a href="#">Find artists</a>
    </div>
    <div class="achievementsByNow">
      <div class="title">The achievements by now</div>
      <div class="grid-container">
        <div class="grid-content">
          <div class="pic" style="backgroundImage: url('https://s.pximg.net/www/js/fanbox/0c04a4e7e720095e665d67720f141de9.png')"></div>
          <div class="text">7.8M Users</div>
        </div>
        <div class="grid-content">
          <div class="pic" style="backgroundImage: url('https://s.pximg.net/www/js/fanbox/0c04a4e7e720095e665d67720f141de9.png')"></div>
          <div class="text">7.8M Users</div>
        </div>
        <div class="grid-content">
          <div class="pic" style="backgroundImage: url('https://s.pximg.net/www/js/fanbox/0c04a4e7e720095e665d67720f141de9.png')"></div>
          <div class="text">7.8M Users</div>
        </div>
      </div>
      <div class="date-until">
        The data is up-to-date until 09, 2021
      </div>
    </div>
    <div class="FAQ">
      <div class="question">What kind of service is pixivFANBOX?</div>
      <div class="answer">
        pixivFANBOX is a fan community made to support the creative activities of creators. More than just providing a place for followers to make regular donations, this is a place for creators to challenge themselves by keeping up their creative activities and producing new content.

        90% of each pledge goes directly to the creator, while the rest counts towards a settlement fee paid to an accounting company and a service fee paid to FANBOX for management and feature production.

        Also, creators can post FAN-exclusive content in a variety of forms, including blogs, illustrations, manga, photos, audio, videos, and more.</div>
    </div>
    <div class="start-now">
      <div class="title">Let's get started now!</div>
      <a href="https://">
        <div class="search">Find artists</div>
      </a>
    </div>
  </div>
</template>

<script>
import { frontpage } from '@/api/user'

export default {
  name: 'Index',
  data() {
    return {
      recommendArtists: [],
    }
  },
  mounted() {
    frontpage()
      .then(res => {
        this.recommendArtists = res.data
        this.loadArtistsInfo()
      })
      .catch(err => {
        console.log({err})
      })
  },
  methods: {
    checkIsImage(url) {
      const fileExtension = url.substring(url.lastIndexOf('.') + 1);
      if (fileExtension === 'jpg' || fileExtension === 'png' || fileExtension == 'jpeg' || fileExtension == 'gif') {
        return process.env.VUE_APP_BASE_API + url
      } else {
        return require('@/assets/no_cover.jpeg')
      }
    },
    loadArtistsInfo() {
      this.$nextTick(() => {
        for (const artist of this.recommendArtists) {
          const artistBgDom = this.$refs['artistBg' + artist['username']]
          const artistAvatarDom = this.$refs['artistAvatar' + artist['username']]
          artistBgDom.style.backgroundImage = `url("${this.checkIsImage(artist['store_location']) }")`
          artistAvatarDom.style.backgroundImage = `url("${process.env.VUE_APP_BASE_API + artist['profile_pic_store']}")`
        }
      })
    }
  }
}
</script>

<style scoped>
.one-word {
  background: linear-gradient(108.54deg, rgb(220, 255, 203), rgb(225, 255, 237), rgb(184, 229, 255));
  padding-top: 100px;
  padding-bottom: 150px;
}

.one-word img {
  margin-top: 0;
  color: #ff424d;
  height: 80px;
}

.one-word p {
  color: #666;
}

.recommendations {
  display: flex;
  margin: -100px 100px 0 100px;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
}

.recommend-artist {
  height: 200px;
  background: #fff;
  border-radius: 15px;
  box-shadow: rgb(186 231 254) 0px 5px 20px;
  /*opacity: 0;*/
  flex: 30%;
  margin: 1.5%;
  position: relative;
}

.artistBg {
  height: 70%;
  background: center / cover no-repeat;
  border-radius: 12px;
}

.artistInfo {
  display: flex;
  align-items: center;
  flex-direction: column;
  position: absolute;
  top: 58%;
  left: 50%;
  right: 50%;
}

.artistAvatar {
  width: 50px;
  height: 50px;
  background-size: cover;
  border-radius: 50%;
}

.artistName {
  font-weight: bold;
  text-decoration: none;
  color: #000;
}

.findArtist {
  width: 250px;
  height: 52px;
  background-color: #66ccff;
  border-radius: 35px;
  opacity: .9;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
}

.findArtist a {
  text-decoration: none;
  color: #fff;
  font-weight: bold;
  content-align: center;
}

.achievementsByNow {
  font-size:55px;
  font-weight: bold;
  background-color: rgb(234, 251, 255);
  position: relative;
  margin-top: 30px;
}

.achievementsByNow .title {
  width: 720px;
  background-color: #66ccff;
  opacity: .9;
  color: #fff;
  clip-path: polygon(0px 0px, 100% 0px, calc(100% - 30px) 50%, 100% 100%, 0px 100%, 30px 50%);
  position: absolute;
  top: 40px;
  left: 0;
  right: 0;
  margin: auto;
  padding: 10px;
}

.grid-container{
  margin: 0 auto;
  display: grid;
  gap: 40px;
  grid-template-columns: repeat(3, 1fr);
  padding-top: 175px;
  max-width: 1280px;
}

.grid-content{
  max-width: 500px;
  display: flex;
  flex-direction: column;
  border-radius: 45px;
  background: #fff;
}

.grid-content .pic {
  height: 100%;
  width: 100%;
   padding-top: 65%;
  background: center center / contain no-repeat;
  flex: 3;
}

.grid-content .text {
  flex: 1;
  font-size: 45px;
}

.date-until {
  font-size: 15px;
  font-weight: normal;
  padding: 30px;
}

.FAQ {
  background: linear-gradient(108.54deg, rgb(220, 255, 203), rgb(225, 255, 237), rgb(184, 229, 255));
  padding: 80px 0;
}

.question {
  font-size: 26px;
}

.answer {
  margin: 15px 30px;
  text-align: left;
}

.start-now {
  height: 350px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.start-now .title {
  font-size: 35px;
  font-weight: bold;
  padding: 55px;
}

.start-now a {
  text-decoration: none;
}

.start-now .search {
  font-size: 16px;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #66ccff;
  color: #fff;
  border-radius: 30px;
  width: 280px;
  height: 60px;
}
img {
  max-width:100%;
  max-height:100%;
}
</style>
