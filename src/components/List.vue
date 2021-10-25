<template>
    <div class="button">
      <el-button type="primary" class="back" @click="Back()" round>Back</el-button>
      <el-button type="primary" class="edit" @click="Edit()" round>Edit</el-button>
    </div>
    <div class="block" v-for="artist in subList" :key="artist" @click="jump(artist)">
      <el-col :span="4" class="delete" v-show="displayOption">
        <el-button type="danger" icon="el-icon-delete" circle @click="Delete(artist)"></el-button>
      </el-col>
      <el-col :span="20">
        <el-card shadow="hover" class="favList">
          <div class="row">
            <div class="column1">
              <img
                  :src= checkIsImage(artist[0].user.profilePicStore) style="width:80px">
            </div>
            <div class="column2">
              <h5>{{artist[0].user.username}}</h5>
              <h5>{{artist[0].user.description}}</h5>
            </div>
            <div class="column3">
              <div class="image-container">
                <el-image 
                    v-for="artifact in artist[0].user.urls" :key="artifact" 
                    :src= checkIsImage(artifact.url)
                    fit="cover">
                
                </el-image>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </div>
    <br><br>
    <el-button type="success" plain v-show="displayConfirm" class="confirm" @click="Confirm()">Confirm</el-button>
</template>

<script>
import {unfollowCreator} from '@/api/creator'
import {ElMessage} from 'element-plus'

export default {
  name: 'List',
  props: {
    elements: {
      type: Array,
      required: true
    },
    artifacts: {
      type: Array,
      required: true
    },
  },
  data() {
    return {
      displayUser:true,
      displayOption:false,
      displayConfirm:false,
      subList:[],
      picList:[]
    }
  },

  watch: {
    elements(){
      this.subList = this.elements
      // console.log("1",this.subList[0][0].user.urls['url'])
      console.log("2",this.subList[1][0].user)
    },
    artifacts() {
      this.picList = this.artifacts
      
    }
  },
  methods: {
    Back() {
      this.$router.go(-1)
    },
    Edit(){
      console.log("artid",this.artifacts)
      if(this.displayOption == true){
        this.displayOption=false;
        this.displayConfirm=false;

      }else{
        this.displayOption=true;
        this.displayConfirm=true;
      }
    },
    Delete(artist){
      console.log(artist)
      console.log(artist[0])
      unfollowCreator({"id":artist[0].user.id}).then(res => {
        ElMessage.success(res['msg'])
        setTimeout(() => {
          this.$router.go(0)
        }, 1000)
      })
    },
    jump(item) {
      const user = item[0]['user']['id']
      this.$router.push(`/artist/${user}`)
    },
    Confirm(){
      this.displayOption=false;
      this.displayConfirm=false;
    },
    interceptOverflow(text) {
      if (text.length > 70) {
        return text.substr(0, 70) + '...'
      }
      return text
    },
    checkIsImage(url) {
      const fileExtension = url.substring(url.lastIndexOf('.') + 1);
      if (fileExtension === 'jpg' || fileExtension === 'png' || fileExtension == 'jpeg' || fileExtension == 'gif'){
        return process.env.VUE_APP_BASE_API + url
      } else {
        return require('@/assets/no_cover.jpeg')
      }
    },
  }
}
</script>

<style scoped>

.button {
  margin: 0 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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

.image-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 20px;
}

.image-container .el-image{
  width: 180px;
  height: 160px;
  margin-right: 20px;
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
