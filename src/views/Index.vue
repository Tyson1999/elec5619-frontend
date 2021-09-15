<template>
  <div class="container">
    <div class="one-word">
      <img src="~@/assets/logo.svg">
      <p>FANBOX is a community where creators can receive continuous support from their fans.</p>
    </div>
    <div class="recommendations">
      <div v-for="artist in recommendArtists"
           :class="'recommend-artist' + ' ' + 'artist' + artist['id']"
           :key="artist">
        <a href="">
          <div class="artistBg" :ref="'artistBg' + artist['id']"></div>
          <div class="artistInfo">
            <div class="artistAvatar" :ref="'artistAvatar' + artist['id']"></div>
            <div class="artistName">{{artist['name']}}</div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      recommendArtists: [{
        id: 1,
        name: 'test1',
        backgroundImg: 'https://pixiv.pximg.net/c/1620x580_90_a2_g5/fanbox/public/images/creator/15158551/cover/NPy80WSo8K6OM7e2XexEmj6T.jpeg',
        avatar: 'https://pixiv.pximg.net/c/160x160_90_a2_g5/fanbox/public/images/user/15158551/icon/uVDbbp4FBnsIggxp4Kd7HpVJ.jpeg'
      },{
        id: 2,
        name: 'test2',
        backgroundImg: 'https://pixiv.pximg.net/c/1620x580_90_a2_g5/fanbox/public/images/creator/3439325/cover/CYDiO1go1lpqyGQD8tyurWa2.jpeg',
        avatar: 'https://pixiv.pximg.net/c/160x160_90_a2_g5/fanbox/public/images/user/15158551/icon/uVDbbp4FBnsIggxp4Kd7HpVJ.jpeg'
      },
        {
          id: 3,
          name: 'test3',
          backgroundImg: 'https://pixiv.pximg.net/c/1620x580_90_a2_g5/fanbox/public/images/creator/3439325/cover/CYDiO1go1lpqyGQD8tyurWa2.jpeg',
          avatar: 'https://pixiv.pximg.net/c/160x160_90_a2_g5/fanbox/public/images/user/15158551/icon/uVDbbp4FBnsIggxp4Kd7HpVJ.jpeg'
        },
        {
          id: 4,
          name: 'test4',
          backgroundImg: 'https://pixiv.pximg.net/c/1620x580_90_a2_g5/fanbox/public/images/creator/3439325/cover/CYDiO1go1lpqyGQD8tyurWa2.jpeg',
          avatar: 'https://pixiv.pximg.net/c/160x160_90_a2_g5/fanbox/public/images/user/15158551/icon/uVDbbp4FBnsIggxp4Kd7HpVJ.jpeg'
        },
        {
          id: 5,
          name: 'test5',
          backgroundImg: 'https://pixiv.pximg.net/c/1620x580_90_a2_g5/fanbox/public/images/creator/3439325/cover/CYDiO1go1lpqyGQD8tyurWa2.jpeg',
          avatar: 'https://pixiv.pximg.net/c/160x160_90_a2_g5/fanbox/public/images/user/15158551/icon/uVDbbp4FBnsIggxp4Kd7HpVJ.jpeg'
        },
        {
          id: 6,
          name: 'test6',
          backgroundImg: 'https://pixiv.pximg.net/c/1620x580_90_a2_g5/fanbox/public/images/creator/3439325/cover/CYDiO1go1lpqyGQD8tyurWa2.jpeg',
          avatar: 'https://pixiv.pximg.net/c/160x160_90_a2_g5/fanbox/public/images/user/15158551/icon/uVDbbp4FBnsIggxp4Kd7HpVJ.jpeg'
        },
      ]
    }
  },
  mounted() {
    this.loadArtistsInfo()
  },
  methods: {
    loadArtistsInfo() {
      for (const artist of this.recommendArtists){
        const artistBgDom = this.$refs['artistBg' + artist['id']]
        const artistAvatarDom = this.$refs['artistAvatar' + artist['id']]
        artistBgDom.style.backgroundImage = `url("${artist['backgroundImg']}")`
        console.log(artistAvatarDom)
        artistAvatarDom.style.backgroundImage = `url("${artist['avatar']}")`
      }
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
  background-size: cover;
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
</style>
