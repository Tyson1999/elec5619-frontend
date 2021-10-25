<template>
      <!-- <div class="container" v-loading="loading != 0"> -->
      <div class="container" >

      <el-tabs type="border-card" class="borderCard" @tab-click="tabClicked">
        <!-- Account Setting -->
        <el-tab-pane label="Account Setting" class="account">
          <div class="button">
            <el-button type="primary" class="back" @click="Back()" round>Back</el-button>
            <el-button type="text" class="logout" v-show="displayUser">Hi {{username}}</el-button>
          </div>
          <el-upload
            class="upload"
            action=""
            :auto-upload="false"
            :on-exceed="handleExceed"
            :on-change="onUploadChange"
            :show-file-list="false"
            list-type="picture">
            <span class="dot" :style="{backgroundImage: 'url(' + avatar + ')'}">
            <p style="font-weight: bold; font-size: 50px; color: #000">+</p>
            </span>
          </el-upload>
          <el-form ref="form" label-width="120px" class="autoFilled" style="margin-top: 10px">
            <el-form-item label="Username">
              <el-input  placeholder="Username" v-model="username"></el-input>
            </el-form-item>
            <el-form-item label="Password">
              <el-input placeholder="Password" v-model="newPassword" show-password></el-input>
            </el-form-item>
            <el-form-item label="New Password">
              <el-input placeholder="New Password" v-model="retypePassword" show-password></el-input>
            </el-form-item>
              <el-button type="primary" @click="Submit()" class="submit">Submit</el-button>
          </el-form>
        </el-tab-pane>
        <!-- Favorite List -->
        <el-tab-pane label="Favorite List" class="favorite">
          <List :elements="favoriteList" :artifacts="artifacts" />
        </el-tab-pane>
        <!-- Subscribe List -->
        <el-tab-pane label="Subscribe List" class="subscribe">
          <List :elements="subscribeList" :artifacts="artifacts" />
        </el-tab-pane>
        <!-- Creation List -->
        <el-tab-pane label="My Creation List" class="creation"  v-if="isCreator">
          <List :elements="creationList" :artifacts="artifacts" />
        </el-tab-pane>
        <!-- Support level -->
        <el-tab-pane label="My Support Level" class="creation" v-if="isCreator">
          <SupportLevel />
        </el-tab-pane>
        <el-tab-pane label="New Post" class="creation" v-if="isCreator" />
      </el-tabs>
  </div>
</template>

<script>
import List from '@/components/List'
import SupportLevel from '@/components/SupportLevel'
import { mapState } from 'vuex'
import { ElMessage } from 'element-plus'
import { changeNameAndPassword, addProfilePicture, getUserInfo, getSubscribeList, getFavouriteList } from '@/api/user'
import {getArtifactById} from '@/api/work'


export default {
  name:'UserProfile',
  components: {
    List,
    SupportLevel
    },
  created() {
    // load Fav list, Subs list
    getSubscribeList()
        .then(res => {
          this.subscribeList = res.data
          this.loading--
        })
    getFavouriteList()
        .then(res => {
          this.favoriteList = res.data
          this.loading--
        })
    getUserInfo()
        .then(res => {
          res = res['data']
          const lst = []
          lst.push([])
          lst[0].push({"user": {"username":res.username,"profilePicStore":res.avatar,"id":res.id}})
          this.creationList = lst
          this.loading--
        })
  },
  data() {
      return {
        newPassword:'',
        retypePassword: '',
        fileList: [],
        displayUser:true,
        displayOption:false,
        displayConfirm:false,
        subscribeList:[],
        favoriteList:[],
        creationList:[],
        artifact: [],
        artifacts: [],
        id:'',
        userId:{},
        loading: 3
      }
  },
  methods: {
    Submit() {
      const username = this.username
      const password = this.newPassword
      const retype_password = this.retypePassword

      if (password === '' || retype_password === ''){
        ElMessage.error("Please fill in the form")
        return;
      }

      if (password != retype_password){
        ElMessage.error("Two passwords don't match")
        return;
      }

      changeNameAndPassword({username,password})
        .then(res => {
          ElMessage.success(res.msg)
        })
        .catch(err => {
          console.log({err})
        })
    },

    setImage (output) {
    this.hasImage = true;
    this.image = output;
    console.log("Info", output.info);
    console.log("Exif", output.exif);
    },

    handleExceed() {
      ElMessage.error("You can upload 1 image file at max")
    },
    onUploadChange(file) {
      const formData = new FormData()
      formData.append("file", file.raw)
      addProfilePicture(formData)
          .then(res => {
            ElMessage.success(res['msg'])
            setTimeout(() => {
              this.$router.go(0)
            }, 1500)
          })
          .catch(err => {
            ElMessage.error(err['message'])
          })
    },

    Back() {
      this.$router.go(-1)
    },

    Edit(){
      if(this.displayOption == true){
        this.displayOption=false;
        this.displayConfirm=false;

      }else{
        this.displayOption=true;
        this.displayConfirm=true;
      }
    },
    tabClicked(p) {
      if (p['props']['label'] == 'New Post') {
        this.$router.push('/newPost')
      }
      if (p['props']['label'] == 'Subscribe List') {
        
        for (let i = 0; i < this.subscribeList.length; i++) {
          const userId = {id: this.subscribeList[i][0].user.id}
          getArtifactById(userId)
              .then(res => {
                this.artifacts = []
                 for (const item of res.data){
                    const urlPic = {"url": item['store_location']}
                    this.artifacts.push(urlPic)
                  }
                   this.subscribeList[i][0].user.urls= this.artifacts
            
              })
            //  console.log("aa", this.subscribeList[i][0].user)


              
        }
      }
        if (p['props']['label'] == 'Favorite List') {
          for (let i = 0; i < this.favoriteList.length; i++) {
            const userId = {id: this.favoriteList[i][0].user.id}
            getArtifactById(userId)
                .then(res => {
                  this.artifacts = []
                 for (const item of res.data){
                    const urlPic = {"url": item['store_location']}
                    this.artifacts.push(urlPic)
                  }
                  this.favoriteList[i][0].user.urls= this.artifacts

                })
                console.log("aa", this.favoriteList[i][0].user)
          }
        }
       if (p['props']['label'] == 'My Creation List'){
            this.artifacts = []
            const userId = {id: this.creationList[0][0]['user']['id']}
              getArtifactById(userId)
                .then(res => {
                  res = res['data']
                  for (const item of res){
                    const urlPic = {"url": item['store_location']}
                    this.artifacts.push(urlPic)
                  }
                })
                .catch(err => {
                console.log(err)
              })
       }
    }
  },
  computed: {
    ...mapState({
      username: state => state.username,
      isCreator: state => state.role === 'creator',
      id: state => state.id,
      avatar: state => state.avatar
    })
  }
}
</script>




<style scoped>
.account {
  height: 500px;
}

.account .dot {
  background: center / contain no-repeat;
  height: 100px;
  width: 100px;
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
  margin: 0 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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
