<template>
  <div class="container">
      <el-tabs type="border-card" class="borderCard">
        <el-tab-pane label="Account Setting" class="account">
          <div class="button">
            <a href="javascript:history.go(-1)">
              <el-button type="primary" class="back" round>Back</el-button>
            </a>
            <el-button type="text" class="logout" @click="Logout()" v-show="displayUser">{{greeting}}</el-button>
          </div>
          <span class="dot" @click="selectImg()">   
            <p>Add Profile Picture</p>
          </span>
          <el-form ref="form" :model="form" label-width="120px" class="autoFilled">
            <el-form-item label="Username">
              <el-input  placeholder="Username" v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="Password">
              <el-input placeholder="Password" v-model="form.oldPassword" show-password></el-input>
            </el-form-item>
            <el-form-item label=" New Password">
              <el-input placeholder="New Password" v-model="form.newPassword" show-password></el-input>
            </el-form-item>
              <el-button type="primary" @click="Submit()" class="submit">Submit</el-button>
          </el-form> 
        </el-tab-pane>
        <el-tab-pane label="Favorite List" class="favorite">
          <div class="button">
            <a href="javascript:history.go(-1)">
              <el-button type="primary" class="back" @click="Back()" round>Back</el-button>
            </a>
            <el-button type="text" class="logout" @click="Logout()">{{greeting}}</el-button>
          </div>
          <div class="block" v-for="artist in Artists" :key="artist">
            <el-col :span="16">
            <el-card shadow="hover" class="favList">
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
        </el-tab-pane>  
        <el-tab-pane label="Subscribe List" class="subscribe">
          <div class="button">
            <a href="javascript:history.go(-1)">
              <el-button type="primary" class="back"  round>Back</el-button>
            </a>
            <el-button type="text" class="logout" @click="Logout()">{{greeting}}</el-button>
          </div>
          <div class="block" v-for="artist in Artists" :key="artist">
            <el-col :span="16">
            <el-card shadow="hover" class="favList">
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
        </el-tab-pane>
      </el-tabs>
  </div>
</template>

<script>

export default {
    name:'UserProfile',
    data() {
        return { 
          greeting:'Hi, username',      
          form: {
            name: '',
            oldPassword:'',
            newPassword: '',
          },
          displayUser:true,
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
                    }],
                    
          
        }
    },
    created(){
      this.userInfo();
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
      }
     

    }
    
}
</script>




<style scoped>
.container {
  background-color: antiquewhite;
}

.el-tabs--border-card {
  background-color: antiquewhite;
}
.container {
  background-color: antiquewhite;
}
.account .dot {
  height: 100px;
  width: 100px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
}

.favorite {
  height: 800px;
}

.subscribe .dot {
  height: 100px;
  width: 100px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
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
.autoFilled {
    width:30%;
    margin-top: 40px;
    margin-left: auto;
    margin-right: auto;
    
}
.submit {
  margin-left: auto;
  margin-right: auto;
}
.favList {
  margin-top: 40px;
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
.prev, .next {
  cursor: pointer;
  position: absolute;
  /* top: 50%; */
  /* width: auto; */
  padding: 10px;
  /* margin-top: -22px;/ */
  /* color: white; */
  font-weight: bold;
  font-size: 18px;
  transition: 0.6s ease;
  border-radius: 0 3px 3px 0;
  user-select: none;
}

.next {
  background-color:lightgray;
  border-radius: 3px 0 0 3px;
  margin-top: 5%;  
  margin-left: -30px;

}
.prev {
  background-color:lightgray;
  border-radius: 3px 0 0 3px;
  margin-top: 15px;  
  margin-left: -640px;

}
.prev:hover, .next:hover {
  background-color: rgba(0,0,0,0.8);
}



</style>