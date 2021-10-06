<template>
  <div class="banner">
    <div class="banner-image" style="background-image: url('https://pixiv.pximg.net/c/1620x580_90_a2_g5/fanbox/public/images/creator/20390859/cover/nSPjsQ2jd5T5Yzq1oaMqNT3m.jpeg')">
<!--      <div class="banner-image-cover"></div>-->
    </div>
  </div>
  <div class="artist">
    <div class="avatar"></div>
    <div class="name">{{name}}</div>
    <el-button type="primary" round icon="el-icon-check" v-if="follow">Following</el-button>
    <el-button type="info" round icon="el-icon-plus" v-else>Follow now</el-button>
  </div>
  <div style="background: #eee; padding-top: 30px;">
    <div class="content-container">
      <div class="posts">
        <div v-for="post in posts" :key="post" class="post">
          <div class="post-image" :style="{backgroundImage: 'url(' + post['cover'] + ')'}"></div>
          <div class="post-meta">
            <div class="post-date">{{post['date']}}</div>
            <div class="post-privilege">{{post['privilege']}}</div>
          </div>
          <div class="post-title">{{post['title']}}</div>
          <div class="post-desc">{{interceptOverflow(post['desc'])}}</div>
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
export default {
  name: 'Artist',
  data() {
    return {
      avatar: '',
      name: 'pixivFANBOX公式',
      follow: false,
      posts: [{
        id: 1,
        cover: 'https://pixiv.pximg.net/c/1200x630_90_a2_g5/fanbox/public/images/post/2746159/cover/JC6wXaAIgAMBZhiDtCNOjrP8.jpeg',
        title: '過去の投稿が探しやすくなるよう、投稿一覧ページをアップデートしました',
        date: '2021/09/21 17:00',
        privilege: 'Public to everyone',
        desc: 'いつもFANBOXをご利用いただきありがとうございます。\n' +
            'FANBOXはサービス開始以来、たくさんのクリエイターのみなさまに継続してご利用いただいており、おかげさまで累計投稿数が150万件を突破いたしました！\n' +
            'そしてこの度、日々公開される数多くの投稿の中から、自分の読みたいものが見つけやすくなるよう、投稿一覧ペー'
        }, {
        id: 2,
        cover: 'https://pixiv.pximg.net/c/1200x630_90_a2_g5/fanbox/public/images/post/2746159/cover/JC6wXaAIgAMBZhiDtCNOjrP8.jpeg',
        title: '過去の投稿が探しやすくなるよう、投稿一覧ページをアップデートしました',
        date: '2021/09/21 17:00',
        privilege: 'Public to everyone',
        desc: 'いつもFANBOXをご利用いただきありがとうございます。\n' +
            'FANBOXはサービス開始以来、たくさんのクリエイターのみなさまに継続してご利用いただいており、おかげさまで累計投稿数が150万件を突破いたしました！\n' +
            'そしてこの度、日々公開される数多くの投稿の中から、自分の読みたいものが見つけやすくなるよう、投稿一覧ペー'
      }],
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
      }]
    }
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
    }
  },
  filters: {
  }
}
</script>

<style scoped>
.banner {
  width: 100%;
  max-width: 1680px;
}

.banner-image {
  /*https://pixiv.pximg.net/c/1620x580_90_a2_g5/fanbox/public/images/creator/20390859/cover/nSPjsQ2jd5T5Yzq1oaMqNT3m.jpeg*/
  height: 370px;
  background: center / cover no-repeat #eee;
  position: relative;
  z-index: 0;
}

/*.banner-image-cover {*/
/*  position:absolute;*/
/*  left:10px;*/
/*  right:10px;*/
/*  top: 0;*/
/*  height: 100%;*/
/*  z-index: 1;*/
/*  background: #eee;*/
/*  opacity: .9;*/
/*}*/

.artist {
  margin: -15px auto 15px auto;
  max-width: 1000px;
  display: flex;
  align-items: center;
  position:relative;
  z-index: 1;
}

.artist .avatar {
  background: center / cover no-repeat url('https://pixiv.pximg.net/c/160x160_90_a2_g5/fanbox/public/images/user/20390859/icon/ZYMvxFOQp6LyH9nv0luZdH5s.jpeg');
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
