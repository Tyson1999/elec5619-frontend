<template>
  <div class="container">
    <div class="bar">
      <p>Find "familiar" creators.</p>
    </div>
    <div class="title">
      <p>Suggested Artists</p>
    </div>

    <div class="block" v-for="artist in Top5Artists" :key="artist" @click="jump(artist)">
          <el-col :span="16">
            <el-card shadow="hover" class="artList">
              <div class="row">
                <div class="column1">
                  <img :src= checkIsImage(artist[0].user.profilePicStore) style="width:80px">
                </div>
                <div class="column2">
                  <p>{{artist[0].user.username}} </p>
                  <!-- <router-link :to="'/artist/'+artist[0].user.id">{{artist[0].user.username}}
                  </router-link> -->
                  <p>{{artist[0].user.description}}</p>
                </div>
                <div class="column3">
                  <el-carousel :interval="100000" type="card" height="200px">
                    <el-carousel-item v-for="artifact in artist[0].user.urls" :key="artifact">
                      <el-image
                        style="width: 200px; height: 160px ;"
                        :src= checkIsImage(artifact.url)
                        :fit="fill">
                      </el-image>
                    </el-carousel-item>
                  </el-carousel>
                </div>
              </div>
            </el-card>
          </el-col>
      </div>
      <div class="showMore">
        <el-button type="text" v-if="numArtists!=creatorList.length" @click="numArtists = creatorList.length">Show More Artists</el-button>
      </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import {getArtifactById} from '@/api/work'
import {searchName} from '@/api/user'


export default {
  data() {
    return {
      numArtists: 2,
      artifacts: [],
      newArt:[],
      creatorList:[],
      id:'',
      creator:''

    }
  },
  created(){
    this.userInfo()
  },
  computed:{
    ...mapState({
      description: state => state.description,
      }),
    Top5Artists() {
      return this.creatorList.slice(0, this.numArtists);
    },
  },
  methods: {
    userInfo() {
      this.creator = this.$route.query.name;
      searchName(this.creator)
        .then(res => {
          this.creatorList = res.data
          for (let i = 0;i < this.creatorList.length;i++){
            const userId = {id:this.creatorList[i][0].user.id}
            getArtifactById(userId)
              .then(res => {
            // const urlPic = {"url":res.data[0].store_location}
            // this.artifacts.push(urlPic)
                this.artifacts = []
                for (const item of res.data){
                  const urlPic = {"url": item['store_location']}
                  this.artifacts.push(urlPic)
                }
                this.creatorList[i][0].user.urls= this.artifacts
            })
            .catch(err => {
              console.log(err)
            })
          }
        })
    },
    checkIsImage(url) {
      const fileExtension = url.substring(url.lastIndexOf('.') + 1);
      if (fileExtension === 'jpg' || fileExtension === 'png' || fileExtension == 'jpeg' || fileExtension == 'gif'){
        return process.env.VUE_APP_BASE_API + url
      } else {
        return require('@/assets/no_cover.jpeg')
      }
    },
    jump(item) {
      const user = item[0]['user']['id']
      this.$router.push(`/artist/${user}`)
    },
    selectImg(){
      console.log(1);
    },
  },
  watch: {
    $route(to){
      if (to['path'] === '/search'){
        this.userInfo()
      }
    }
  },

}
</script>




<style scoped>
.favorite {
  height: 800px;
}

.bar {
  background-image: linear-gradient(to right, #cce5ff, #b3b3ff);
  height:200px;
}

.bar p {
  text-align: center;
  vertical-align: middle;
  line-height: 180px;
  font-size: 40px;
}

.title p {
  color: grey;
  margin-top: 20px;
  margin-right: 61%;
  font-weight: bold;
}

.dot p {
   margin-top: 30px;
   cursor: pointer;
}

.button {
  display: flex;
}

.button .logout {
    margin-left: auto;
}

.artList {
  margin-top: 10px;
  width:1000px;
  height:200px;
  margin-left: 100px;
}
.block {
  display: inline-block;
}
img {
  border-radius: 50%;
  float: left;
}
.column2 {
  float: left;
  width: 20%;
  padding: 10px;
  height: 180px;
  overflow: scroll;
}
.column2 p {
  width:190px;
  word-wrap: break-word;
}
.column2 h5 {
  float:left;
  color: lightskyblue;

}
.row:after {
  content: "";
  display: table;
  clear: both;
}

.el-carousel__item:nth-child(2n) {
background-color: white
}

.el-carousel__item:nth-child(2n+1) {
  background-color: white
}


</style>
