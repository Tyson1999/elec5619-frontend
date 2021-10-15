<template v-slot="tip" class="el-upload__tip">
  <div class="container">
      <el-tabs type="border-card" class="borderCard">
        <el-tab-pane label="Account Setting" class="account">
          <div class="button">
            <a href="javascript:history.go(-1)">
              <el-button type="primary" class="back" round>Back</el-button>
            </a>
            <el-button type="text" class="logout" @click="Logout()" v-show="displayUser">Hi {{username}}</el-button>
          </div>
          <span class="dot">   
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList"
              list-type="picture">
              <span class="dot" @click="selectImg()">   
              <p>Add Profile Picture</p>
              </span>
            </el-upload>
          </span>
          <el-form ref="form" :model="form" label-width="120px" class="autoFilled">
            <el-form-item label="Username">
              <el-input  placeholder="Username" v-model="username"></el-input>
            </el-form-item>
            <el-form-item label="Password">
              <el-input placeholder="Password" v-model="oldPassword" show-password></el-input>
            </el-form-item>
            <el-form-item label=" New Password">
              <el-input placeholder="New Password" v-model="newPassword" show-password></el-input>
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
            <el-button type="text" class="edit" @click="Edit()">Edit</el-button>

          </div>
          <div class="block" v-for="artist in Artists" :key="artist">
            <el-col :span="4" class="delete" v-show="displayOption">
              <el-button type="danger" icon="el-icon-delete" circle @click="Delete(artist)"></el-button>
            </el-col>
            <el-col :span="20">
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
          <br><br>
          <el-button type="success" plain v-show="displayConfirm" class="confirm" @click="Confirm()">Confirm</el-button>
        </el-tab-pane>  
        <el-tab-pane label="Subscribe List" class="subscribe">
          <div class="button">
            <a href="javascript:history.go(-1)">
              <el-button type="primary" class="back"  round>Back</el-button>
            </a>
            <el-button type="text" class="logout" @click="Logout()">{{greeting}}</el-button>
            <el-button type="text" class="edit" @click="Edit()">Edit</el-button>

          </div>
          <div class="block" v-for="artist in Artists" :key="artist">
            <el-col :span="4" class="delete" v-show="displayOption">
              <el-button type="danger" icon="el-icon-delete" circle @click="Delete(artist)"></el-button>
            </el-col>
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
          <br><br>
          <el-button type="success" plain v-show="displayConfirm" class="confirm" @click="Confirm()">Confirm</el-button>
        </el-tab-pane>
        <el-tab-pane label="My Creation List" class="creation" :disabled="isDisabled">
          <div class="button">
            <a href="javascript:history.go(-1)">
              <el-button type="primary" class="back"  round>Back</el-button>
            </a>
            <el-button type="text" class="logout" @click="Logout()">{{greeting}}</el-button>
            <el-button type="text" class="edit" @click="Edit()">Edit</el-button>

          </div>
          <div class="block" v-for="artist in Artists" :key="artist">
            <el-col :span="4" class="delete" v-show="displayOption">
              <el-button type="danger" icon="el-icon-delete" circle @click="Delete(artist)"></el-button>
              <el-button type="primary" icon="el-icon-edit" circle @click="Modify(artist)"></el-button>

            </el-col>
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
          <br><br>
          <!-- <div class="confirm"> -->
            <el-button type="success" class="confirm" plain  @click="Confirm()">Confirm</el-button>
          <!-- </div> -->
        </el-tab-pane>

      </el-tabs>
  </div>
</template>

<script>
import {changeNameAndPassword} from '@/api/user'
import { mapState } from 'vuex';
import { ElMessage } from 'element-plus'

export default {
    name:'UserProfile',
    data() {
        return {  
          oldPassword:'',
          newPassword: '',
          fileList: [],
          displayUser:true,
          displayOption:false,
          displayConfirm:false,
          isDisabled: true,
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
    
    methods: {
      Submit() {
        const username = this.username
        const password = this.newPassword
      // if (password != retype_password){
      //   ElMessage.error("Two passwords don't match")
      //   return;
      // }
      // if (email == '' || password == '' || username == '' || retype_password == ''){
      //   ElMessage.error("Please fill in the form")
      //   return;
      // }
        changeNameAndPassword({username,password})
          .then(res => {
            ElMessage.success(res.msg)
          })
          .catch(err => {
            console.log({err})
          })
          //   console.log({err})
          // .then(() => {
          //   ElMessage.success("Register successfully, you'll be jumped to the login page soon")
          //   this.clearForm()
          //   setTimeout(() => {
          //     this.$router.push('/login')
          //   }, 1500)
          // })
          // .catch(err => {
          //   console.log({err})
          //   this.clearForm()
          // })
    },
  


      // Submit() {
      //   console.log('submitted');
      // },

      Logout(){
        this.displayUser=false;
        console.log(1);
      },

      selectImg(){
        console.log(1);
      },
      setImage: function (output) {
      this.hasImage = true;
      this.image = output;
      console.log("Info", output.info);
      console.log("Exif", output.exif);
    },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },

      Edit(){
        if(this.displayOption == true){
          this.displayOption=false;
          this.displayConfirm=false;
          this.isDisabled=true;

        }else{
          this.displayOption=true;
          this.displayConfirm=true;
          this.isDisabled=false;

        }
      },

      Delete(artist){
        console.log(artist)
      },

      Modify(artist){
        console.log(artist)
        this.$router.push('NewPost')

      },
      Confirm(){
        this.displayOption=false;
        this.displayConfirm=false;
      }
    },

    computed: {
      ...mapState({
        username: state => state.username
      })
    }
    
}
</script>




<style scoped>

.container {
  background-color: antiquewhite;
  /* position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: auto; */
}

.el-tabs--border-card {
  background-color: antiquewhite;
}
.container {
  background-color: antiquewhite;
}
.account {
  height: 500px;
}
.account .dot {
  height: 100px;
  width: 100px;
  margin-left: auto;
  margin-right: auto;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
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
    width:50%;
    /* margin-top: 40px; */
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
.delete {
    margin-top: 80px;

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

.confirm {
  margin-bottom: 10px;

}




</style>