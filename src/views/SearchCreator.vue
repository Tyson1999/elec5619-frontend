<template>
  <div class="container">
    <div class="bar">
      <p>Find "familiar" creators.</p>
    </div>
    <div class="title">
      <p>Suggested Artists</p>
    </div>
    <div class="block" v-for="artist in Top5Artists" :key="artist">
          <el-col :span="16">
            <el-card shadow="hover" class="artList">
              <div class="row">
                <div class="column1">
                  <img src='https://pixiv.pximg.net/c/160x160_90_a2_g5/fanbox/public/images/user/15158551/icon/uVDbbp4FBnsIggxp4Kd7HpVJ.jpeg'  style="width:80px">
                </div>
                <div class="column2">
                  <h5>{{artist.name}}</h5>
                  <p>{{artist.description}}</p>
                </div>
                <div class="column3">
                  <el-carousel :interval="100000" type="card" height="200px">
                    <el-carousel-item v-for="url in artist.urls" :key="url">
                      <el-image
                        style="width: 200px; height: 160px ; "
                        :src="url"
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
        <el-button type="text" v-if="numArtists!=Artists.length" @click="numArtists = Artists.length">Show More Artists</el-button>
      </div>
  </div>
</template>

<script>

export default {
    name:'UserProfile',
    data() {
        return { 
         numArtists: 5,
         Artists: [{name: '吉田誠治',
                    description: '背景グラフィッカ／イラストレータの吉田誠治です。フリーランスで背景やイラストを描いています。SNSではメイキングやTIPSでも評価していただけることが多く、現在は京都精華大学で非常勤講師として教えたりもしています。',
                    urls: ['https://pixiv.pximg.net/c/1620x580_90_a2_g5/fanbox/public/images/creator/3439325/cover/CYDiO1go1lpqyGQD8tyurWa2.jpeg','https://pixiv.pximg.net/c/1620x580_90_a2_g5/fanbox/public/images/creator/3439325/cover/CYDiO1go1lpqyGQD8tyurWa2.jpeg','https://pixiv.pximg.net/c/1620x580_90_a2_g5/fanbox/public/images/creator/3439325/cover/CYDiO1go1lpqyGQD8tyurWa2.jpeg','https://pixiv.pximg.net/c/160x160_90_a2_g5/fanbox/public/images/user/15158551/icon/uVDbbp4FBnsIggxp4Kd7HpVJ.jpeg']
                    },
                    {name: '吉田誠治',
                    description: '背景グラフィッカ／イラストレータの吉田誠治です。フリーランスで背景やイラストを描いています。SNSではメイキングやTIPSでも評価していただけることが多く、現在は京都精華大学で非常勤講師として教えたりもしています。',
                    urls: ['https://pixiv.pximg.net/c/1620x580_90_a2_g5/fanbox/public/images/creator/3439325/cover/CYDiO1go1lpqyGQD8tyurWa2.jpeg','https://pixiv.pximg.net/c/1620x580_90_a2_g5/fanbox/public/images/creator/3439325/cover/CYDiO1go1lpqyGQD8tyurWa2.jpeg','https://pixiv.pximg.net/c/1620x580_90_a2_g5/fanbox/public/images/creator/3439325/cover/CYDiO1go1lpqyGQD8tyurWa2.jpeg']
                    },
                    {name: '吉田誠治',
                    description: '背景グラフィッカ／イラストレータの吉田誠治です。フリーランスで背景やイラストを描いています。SNSではメイキングやTIPSでも評価していただけることが多く、現在は京都精華大学で非常勤講師として教えたりもしています。',
                    urls: ['https://pixiv.pximg.net/c/1620x580_90_a2_g5/fanbox/public/images/creator/3439325/cover/CYDiO1go1lpqyGQD8tyurWa2.jpeg','https://pixiv.pximg.net/c/1620x580_90_a2_g5/fanbox/public/images/creator/3439325/cover/CYDiO1go1lpqyGQD8tyurWa2.jpeg','https://pixiv.pximg.net/c/1620x580_90_a2_g5/fanbox/public/images/creator/3439325/cover/CYDiO1go1lpqyGQD8tyurWa2.jpeg']
                    },
                    {name: '吉田誠治',
                    description: '背景グラフィッカ／イラストレータの吉田誠治です。フリーランスで背景やイラストを描いています。SNSではメイキングやTIPSでも評価していただけることが多く、現在は京都精華大学で非常勤講師として教えたりもしています。',
                    urls: ['https://pixiv.pximg.net/c/1620x580_90_a2_g5/fanbox/public/images/creator/3439325/cover/CYDiO1go1lpqyGQD8tyurWa2.jpeg','https://pixiv.pximg.net/c/1620x580_90_a2_g5/fanbox/public/images/creator/3439325/cover/CYDiO1go1lpqyGQD8tyurWa2.jpeg','https://pixiv.pximg.net/c/1620x580_90_a2_g5/fanbox/public/images/creator/3439325/cover/CYDiO1go1lpqyGQD8tyurWa2.jpeg']
                    },
                    {name: '吉田誠治',
                    description: '背景グラフィッカ／イラストレータの吉田誠治です。フリーランスで背景やイラストを描いています。SNSではメイキングやTIPSでも評価していただけることが多く、現在は京都精華大学で非常勤講師として教えたりもしています。',
                    urls: ['https://pixiv.pximg.net/c/1620x580_90_a2_g5/fanbox/public/images/creator/3439325/cover/CYDiO1go1lpqyGQD8tyurWa2.jpeg','https://pixiv.pximg.net/c/1620x580_90_a2_g5/fanbox/public/images/creator/3439325/cover/CYDiO1go1lpqyGQD8tyurWa2.jpeg','https://pixiv.pximg.net/c/1620x580_90_a2_g5/fanbox/public/images/creator/3439325/cover/CYDiO1go1lpqyGQD8tyurWa2.jpeg']
                    },
                    {name: '吉田誠治',
                    description: '背景グラフィッカ／イラストレータの吉田誠治です。フリーランスで背景やイラストを描いています。SNSではメイキングやTIPSでも評価していただけることが多く、現在は京都精華大学で非常勤講師として教えたりもしています。',
                    urls: ['https://pixiv.pximg.net/c/1620x580_90_a2_g5/fanbox/public/images/creator/3439325/cover/CYDiO1go1lpqyGQD8tyurWa2.jpeg','https://pixiv.pximg.net/c/1620x580_90_a2_g5/fanbox/public/images/creator/3439325/cover/CYDiO1go1lpqyGQD8tyurWa2.jpeg','https://pixiv.pximg.net/c/1620x580_90_a2_g5/fanbox/public/images/creator/3439325/cover/CYDiO1go1lpqyGQD8tyurWa2.jpeg']
                    },
                    {name: '吉田誠治',
                    description: '背景グラフィッカ／イラストレータの吉田誠治です。フリーランスで背景やイラストを描いています。SNSではメイキングやTIPSでも評価していただけることが多く、現在は京都精華大学で非常勤講師として教えたりもしています。',
                    urls: ['https://pixiv.pximg.net/c/1620x580_90_a2_g5/fanbox/public/images/creator/3439325/cover/CYDiO1go1lpqyGQD8tyurWa2.jpeg','https://pixiv.pximg.net/c/1620x580_90_a2_g5/fanbox/public/images/creator/3439325/cover/CYDiO1go1lpqyGQD8tyurWa2.jpeg','https://pixiv.pximg.net/c/1620x580_90_a2_g5/fanbox/public/images/creator/3439325/cover/CYDiO1go1lpqyGQD8tyurWa2.jpeg']
                    },
                    {name: '吉田誠治',
                    description: '背景グラフィッカ／イラストレータの吉田誠治です。フリーランスで背景やイラストを描いています。SNSではメイキングやTIPSでも評価していただけることが多く、現在は京都精華大学で非常勤講師として教えたりもしています。',
                    urls: ['https://pixiv.pximg.net/c/1620x580_90_a2_g5/fanbox/public/images/creator/3439325/cover/CYDiO1go1lpqyGQD8tyurWa2.jpeg','https://pixiv.pximg.net/c/1620x580_90_a2_g5/fanbox/public/images/creator/3439325/cover/CYDiO1go1lpqyGQD8tyurWa2.jpeg','https://pixiv.pximg.net/c/1620x580_90_a2_g5/fanbox/public/images/creator/3439325/cover/CYDiO1go1lpqyGQD8tyurWa2.jpeg']
                    },
                    {name: '吉田誠治',
                    description: '背景グラフィッカ／イラストレータの吉田誠治です。フリーランスで背景やイラストを描いています。SNSではメイキングやTIPSでも評価していただけることが多く、現在は京都精華大学で非常勤講師として教えたりもしています。',
                    urls: ['https://pixiv.pximg.net/c/1620x580_90_a2_g5/fanbox/public/images/creator/3439325/cover/CYDiO1go1lpqyGQD8tyurWa2.jpeg','https://pixiv.pximg.net/c/1620x580_90_a2_g5/fanbox/public/images/creator/3439325/cover/CYDiO1go1lpqyGQD8tyurWa2.jpeg','https://pixiv.pximg.net/c/1620x580_90_a2_g5/fanbox/public/images/creator/3439325/cover/CYDiO1go1lpqyGQD8tyurWa2.jpeg']
                    }],
                    newArt:[]

        
        }
    },
    created(){
      this.userInfo();
    },
    computed:{
      Top5Artists: function() {
        return this.Artists.slice(0, this.numArtists);  
      },
      
      
    },
    
    methods: {
      Submit() {
        console.log('submitted');
      },

      userInfo() {
      },

      Logout(){
        this.displayUser=false;
        console.log(1);
      },

      selectImg(){
        console.log(1);
      },

      

    }
    
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