<template>
  <div>
    <div class="button">
      <el-button type="primary" class="back" @click="Back()" round>Back</el-button>
      <el-button type="primary" class="edit" @click="Edit()" round>{{tableVisibility ? 'Edit' : 'New'}}</el-button>
    </div>
    <el-table
        v-if="tableVisibility"
        border
        style="width: 80%;
        margin: 30px auto;"
        :data="SupportLevel"
        :header-cell-style="headClass"
        :cell-style="headClass"
    >
      <el-table-column prop="id" label="ID" width="100" />
      <el-table-column prop="name" label="Name" width="250" />
      <el-table-column prop="desc" label="Description" width="500" />
      <el-table-column prop="price" label="Price" />
    </el-table>

    <div v-else style="font-size: 20px">
      You haven't set up any support level yet.
    </div>

    <!-- New SupportLevel Form -->
    <el-dialog title="Add new support level" v-model="dialogFormVisible">
      <el-form :model="form" label-width="140px" class="form">
        <el-form-item label="PHOTO level price" required>
          <el-input v-model="form.photoPrice" autocomplete="off" width="120px"></el-input>
        </el-form-item>
        <el-form-item label="MUSIC level price" required>
          <el-input v-model="form.musicPrice" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="ART level price" required>
          <el-input v-model="form.artPrice" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
          <el-button type="primary" @click="setSubsType">
            Confirm
          </el-button>
        </span>
      </template>
    </el-dialog>

  </div>
</template>

<script>
import {ElMessage} from 'element-plus'
import {getSubsType, setSubsType} from '@/api/supportLevel'
export default {
  name: 'SupportLevel',
  created() {
    getSubsType()
        .then(res => {
          if (res['msg'] == 'No such subscribe type information.'){
            this.tableVisibility = false
          } else {
            this.tableVisibility = true
            const support_detail = res['data']
            this.SupportLevel[0]['price'] = '$' + support_detail['photo'] + ' per month'
            this.SupportLevel[1]['price'] = '$' + support_detail['music'] + ' per month'
            this.SupportLevel[2]['price'] = '$' + support_detail['art'] + ' per month'

            this.form.photoPrice = support_detail['photo']
            this.form.musicPrice = support_detail['music']
            this.form.artPrice = support_detail['art']
          }
        })
  },
  data() {
    return {
      dialogFormVisible: false,
      tableVisibility: false,
      form: {
        photoPrice: 0,
        musicPrice: 0,
        artPrice: 0
      },
      SupportLevel: [
        {
          id: 1,
          name: 'PHOTOS',
          desc: 'The supporter can see and download all the PHOTOS',
          price: '$5.99 per month',
          cover: 'https://pixiv.pximg.net/c/936x600_90_a2_g5/fanbox/public/images/plan/64055/cover/5X3OKl1mVniwx9nWovzv6dgd.jpeg'
        },
        {
          id: 2,
          name: 'MUSICS',
          desc: 'The supporter can see and download all the MUSICS',
          price: '$9.99 per month',
          cover: 'https://pixiv.pximg.net/c/936x600_90_a2_g5/fanbox/public/images/plan/64055/cover/5X3OKl1mVniwx9nWovzv6dgd.jpeg'
        },
        {
          id: 3,
          name: 'ARTS',
          desc: 'The supporter can see and download all the ARTS',
          price: '$14.99 per month',
          cover: 'https://pixiv.pximg.net/c/936x600_90_a2_g5/fanbox/public/images/plan/64055/cover/5X3OKl1mVniwx9nWovzv6dgd.jpeg'
        }
      ]
    }
  },
  methods: {
    Back() {
      this.$router.go(-1)
    },
    Edit(){
      this.dialogFormVisible = true
    },
    handleEdit(row) {
      this.form['name'] = row['name']
      this.form['description'] = row['desc']
      this.form['price'] = row['price']
      this.dialogFormVisible = true
    },
    headClass() {
      return "text-align:center"
    },
    setSubsType() {
      setSubsType({
        art: this.form['artPrice'],
        photo: this.form['photoPrice'],
        music: this.form['musicPrice']
      }).then(res => {
        ElMessage.success(res['msg'])
        setTimeout(() => {
          this.$router.go(0)
        }, 1000)
      })
    }
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

.form {
  text-align: left;
}

</style>
