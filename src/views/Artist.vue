<template>
  <div class="banner">
    <div class="banner-image" />
  </div>
  <div class="artist">
    <div class="avatar" :style="{backgroundImage: 'url(' + avatar + ')'}"></div>
    <div class="name">{{name}}</div>
    <el-button type="primary" round icon="el-icon-check" v-if="follow" @click="unfollowCreator">Following</el-button>
    <el-button type="info" round icon="el-icon-plus" v-else @click="followCreator">Follow now</el-button>
  </div>
  <Article
      :show="showDetail"
      :title="title"
      :description="description"
      @closeDrawer="closeDrawer"
  />
  <div style="background: #eee; padding-top: 30px;">
    <div class="content-container">
      <div class="posts" v-if="posts">
          <div v-for="post in posts" :key="post" class="post">
            <a a href="javascript:;" style="text-decoration: none; color: #000" @click="checkArticleDetail(post)">
              <div class="post-image" :style="{backgroundImage: 'url(' + checkIsImage(post['store_location']) + ')'}"></div>
              <div class="post-meta">
                <div class="post-date">{{post['category_name']}}</div>
                <div class="post-privilege">{{'Public to everyone'}}</div>
              </div>
              <div class="post-title">{{post['title']}}</div>
              <div class="post-desc">{{interceptOverflow(post['description'])}}</div>
            </a>
          </div>
      </div>
      <div class="support-levels">
        <div v-if="levels.length > 0">
          <div v-for="level in levels" :key="level" class="level">
            <div class="level-image" :style="{backgroundImage: 'url(' + level['cover'] + ')'}"></div>
            <div class="level-title">{{level['title']}}</div>
            <div class="level-desc">{{level['desc']}}</div>
            <div class="level-price" v-html="handlePrice(level['price'])"></div>
            <el-button class="level-join" type="primary" icon="el-icon-star-off" round>Join now</el-button>
          </div>
        </div>
        <div v-else class="level" style="padding: 24px;">
          The artist doesn't accept any support.
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {ElMessage} from 'element-plus'
import Article from '@/components/Article'
import {getArtifactById} from '@/api/work'
import {getCreatorInfo, followCreator, unfollowCreator} from '@/api/creator'
export default {
  name: 'Artist',
  components: {Article},
  data() {
    return {
      creatorId: this.$route.params,
      avatar: '',
      name: '',
      follow: false,
      posts: [],
      levels: [{
        id: 1,
        cover: 'https://pixiv.pximg.net/c/936x600_90_a2_g5/fanbox/public/images/plan/64055/cover/5X3OKl1mVniwx9nWovzv6dgd.jpeg',
        title: 'LATEST COMICS',
        desc: 'You can see my comics for the last 2 months.',
        price: '5.99'
      },{
        id: 2,
        cover: 'https://pixiv.pximg.net/c/936x600_90_a2_g5/fanbox/public/images/plan/64055/cover/5X3OKl1mVniwx9nWovzv6dgd.jpeg',
        title: 'LATEST VIDEOS',
        desc: 'You can see my videos for the last 2 months.',
        price: '9.99'
      }],
      /* Params to the Article.vue components */
      showDetail: false,
      title: '',
      description: ''
    }
  },
  created() {
    // Obtain user id, and request the related data from backend
    getArtifactById(this.creatorId)
        .then(res => {
          this.posts = res['data']
        })
        .catch(() => {
          this.$router.push('/404')
        })
    getCreatorInfo(this.creatorId)
        .then(res => {
          res = res['data']
          this.follow = res['favourite']
          const user = res['user']
          this.name = user['username']
          this.avatar = process.env.VUE_APP_BASE_API + user['profilePicStore']
        })
  },
  methods: {
    interceptOverflow(text) {
      if (text.length > 100) {
        return text.substr(0, 100) + '...'
      }
      return text
    },
    handlePrice(price) {
      return '<span style="font-size: 20px">$</span>' + price + '/month'
    },
    checkIsImage(url) {
      const fileExtension = url.substring(url.lastIndexOf('.') + 1);
      if (fileExtension === 'jpg' || fileExtension === 'png' || fileExtension == 'jpeg' || fileExtension == 'gif'){
        return process.env.VUE_APP_BASE_API + url
      } else {
        return require('@/assets/no_cover.jpeg')
      }
    },
    followCreator() {
      followCreator(this.creatorId).then(res => {
        ElMessage.success(res['msg'])
        setTimeout(() => {
          this.$router.go(0)
        }, 1000)
      })
    },
    unfollowCreator() {
      unfollowCreator(this.creatorId).then(res => {
        ElMessage.success(res['msg'])
        setTimeout(() => {
          this.$router.go(0)
        }, 1000)
      })
    },
    checkArticleDetail(post) {
      this.title = post['title']
      this.description = post['description']
      this.showDetail = true
    },
    closeDrawer() {
      this.showDetail = false
    }
  }
}
</script>

<style scoped>
.banner {
  width: 100%;
  max-width: 1680px;
}

.banner-image {
  height: 450px;
  background: url('~@/assets/artist-banner-default.jpeg') center / cover no-repeat #eee;
  position: relative;
  z-index: 0;
}

.artist {
  margin: -15px auto 15px auto;
  max-width: 1000px;
  display: flex;
  align-items: center;
  position:relative;
  z-index: 1;
}

.artist .avatar {
  background: center / cover no-repeat;
  width: 100px;
  height: 100px;
  margin-right: 15px;
  border-radius: 50%;
}

.artist .name {
  font-size: 20px;
  font-white: bold;
  margin-right: 25px;
}

.content-container {
  display: flex;
  max-width: 1000px;
  padding-bottom: 50px;
}

.content-container .posts {
  flex: 2;
  margin-right: 25px;
}

.post {
  background-color: #fff;
  margin-bottom: 30px;
}

.post .post-image {
  height: 100%;
  padding-top: 52%;
  background: center / cover no-repeat;
}

.post .post-meta {
  display: flex;
  justify-content: space-between;
  margin: 10px 25px;
  color: rgb(102, 102, 102);
}

.post-meta .post-date {
  font-size: 12px;
}

.post-meta .post-privilege {
  font-size: 12px;
  background: rgb(245, 245, 245);
  padding: 2px 8px;
}

.post .post-title {
  font-weight: bold;
  font-size: 20px;
  text-align: left;
  padding: 0 16px;
}

.post .post-desc {
  text-align: left;
  padding: 15px 16px;
  overflow: hidden;
  color: rgb(102, 102, 102);
  font-size: 14px;
}
.support-levels {
  flex: 1;
}

.content-container .level {
  background: #fff;
  font-size: 14px;
  margin-bottom: 30px;
}

.level .level-image {
  padding-top: 50%;
  background: center / cover no-repeat;
}

.level .level-title {
  padding: 10px 14px;
  font-weight: bold;
}

.level .level-desc {
  padding: 0 14px 10px 14px;
  color: rgb(102, 102, 102);
}

.level .level-join {
  margin: 10px;
}
</style>
