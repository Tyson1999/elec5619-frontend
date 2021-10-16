<template v-slot="tip" class="el-upload__tip">
  <div class="container">
      <el-tabs type="border-card" class="borderCard">
        <!-- Account Setting -->
        <el-tab-pane label="Account Setting" class="account">
          <div class="button">
            <el-button type="primary" class="back" @click="Back()" round>Back</el-button>
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
              <el-input placeholder="Password" v-model="newPassword" show-password></el-input>
            </el-form-item>
            <el-form-item label=" New Password">
              <el-input placeholder="New Password" v-model="retypePassword" show-password></el-input>
            </el-form-item>
              <el-button type="primary" @click="Submit()" class="submit">Submit</el-button>
          </el-form>
        </el-tab-pane>
        <!-- Favorite List -->
        <el-tab-pane label="Favorite List" class="favorite">
          <List :elements="Artists" />
        </el-tab-pane>
        <!-- Subscribe List -->
        <el-tab-pane label="Subscribe List" class="subscribe">
          <List :elements="Artists" />
        </el-tab-pane>
        <!-- Creation List -->
        <el-tab-pane label="My Creation List" class="creation"  v-if="isCreator">
          <List :elements="Artists" />
        </el-tab-pane>
        <!-- Support level -->
        <el-tab-pane label="My Support Level" class="creation" v-if="isCreator">
          <SupportLevel :elements="SupportLevel" />
        </el-tab-pane>
        <el-tab-pane label="New Post" class="creation" v-if="isCreator">
          <SupportLevel :elements="SupportLevel" />
        </el-tab-pane>
      </el-tabs>
  </div>
</template>

<script>
import List from '@/components/List'
import SupportLevel from '@/components/SupportLevel'
import { mapState } from 'vuex'
import { ElMessage } from 'element-plus'
import {changeNameAndPassword} from '@/api/user'

export default {
  name:'UserProfile',
  components: {List, SupportLevel},
  // loading data from backend
  created() {
    // load Fav list, Subs list
    console.log()
    // load my work and support level
    // eslint-disable-next-line no-empty
    if (this.isCreator){}
  },
  data() {
      return {
        newPassword:'',
        retypePassword: '',
        fileList: [],
        displayUser:true,
        displayOption:false,
        displayConfirm:false,
        Artists: [
            {
              name: '吉田誠治',
              description: '背景グラフィッカ／イラストレータの吉田誠治です。フリーランスで背景やイラストを描いています。SNSではメイキングやTIPSでも評価していただけることが多く、現在は京都精華大学で非常勤講師として教えたりもしています。',
              urls: ['https://pixiv.pximg.net/c/1620x580_90_a2_g5/fanbox/public/images/creator/3439325/cover/CYDiO1go1lpqyGQD8tyurWa2.jpeg','https://pixiv.pximg.net/c/1620x580_90_a2_g5/fanbox/public/images/creator/3439325/cover/CYDiO1go1lpqyGQD8tyurWa2.jpeg','https://pixiv.pximg.net/c/1620x580_90_a2_g5/fanbox/public/images/creator/3439325/cover/CYDiO1go1lpqyGQD8tyurWa2.jpeg','https://pixiv.pximg.net/c/160x160_90_a2_g5/fanbox/public/images/user/15158551/icon/uVDbbp4FBnsIggxp4Kd7HpVJ.jpeg']

            },
            {
              name: '吉田誠治',
              description: '背景グラフィッカ／イラストレータの吉田誠治です。フリーランスで背景やイラストを描いています。SNSではメイキングやTIPSでも評価していただけることが多く、現在は京都精華大学で非常勤講師として教えたりもしています。',
              urls: ['https://pixiv.pximg.net/c/1620x580_90_a2_g5/fanbox/public/images/creator/3439325/cover/CYDiO1go1lpqyGQD8tyurWa2.jpeg','https://pixiv.pximg.net/c/1620x580_90_a2_g5/fanbox/public/images/creator/3439325/cover/CYDiO1go1lpqyGQD8tyurWa2.jpeg','https://pixiv.pximg.net/c/1620x580_90_a2_g5/fanbox/public/images/creator/3439325/cover/CYDiO1go1lpqyGQD8tyurWa2.jpeg']

            },
            {
              name: '吉田誠治',
              description: '背景グラフィッカ／イラストレータの吉田誠治です。フリーランスで背景やイラストを描いています。SNSではメイキングやTIPSでも評価していただけることが多く、現在は京都精華大学で非常勤講師として教えたりもしています。',
              urls: ['https://pixiv.pximg.net/c/1620x580_90_a2_g5/fanbox/public/images/creator/3439325/cover/CYDiO1go1lpqyGQD8tyurWa2.jpeg','https://pixiv.pximg.net/c/1620x580_90_a2_g5/fanbox/public/images/creator/3439325/cover/CYDiO1go1lpqyGQD8tyurWa2.jpeg','https://pixiv.pximg.net/c/1620x580_90_a2_g5/fanbox/public/images/creator/3439325/cover/CYDiO1go1lpqyGQD8tyurWa2.jpeg']
            }
        ],
        SupportLevel: [
          {
            id: 1,
            name: 'LATEST COMICS',
            desc: 'You can see my comics for the last 2 months.',
            price: '5.99',
            cover: 'https://pixiv.pximg.net/c/936x600_90_a2_g5/fanbox/public/images/plan/64055/cover/5X3OKl1mVniwx9nWovzv6dgd.jpeg'
          },
          {
            id: 2,
            name: 'LATEST VIDEOS',
            desc: 'You can see my videos for the last 2 months.',
            price: '9.99',
            cover: 'https://pixiv.pximg.net/c/936x600_90_a2_g5/fanbox/public/images/plan/64055/cover/5X3OKl1mVniwx9nWovzv6dgd.jpeg'
          }
        ]
      }
  },
  methods: {
    Submit() {
      const username = this.username
      const password = this.newPassword
      const retype_password = this.retypePassword

      if (this.newPassword == '' || this.retype_password == ''){
        ElMessage.error("Please fill in the form")
        return;
      }

      if (password != retype_password){
        ElMessage.error("Two passwords don't match")
        console.log("1",password)
        console.log("2",retype_password)
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

    Logout(){
      this.displayUser=false;
      console.log(1);
    },

    selectImg(){
      console.log(1);
    },

    setImage (output) {
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
    }
  },

  computed: {
    ...mapState({
      username: state => state.username,
      isCreator: state => state.role === 'creator'
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
