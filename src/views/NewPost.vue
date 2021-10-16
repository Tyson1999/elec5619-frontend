<template>
  <div class="container">
    <div style="display: flex; margin-bottom: 10px">
      <el-select v-model="selectedOption" placeholder="Select" style="margin-right: 10px">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        >
        </el-option>
      </el-select>
      <el-input v-model="title" placeholder="Enter the title here"/>
    </div>
    <el-upload
        class="upload"
        drag
        action=""
        thumbnail-mode
        limit="1"
        :auto-upload="false"
        :on-exceed="handleExceed"
        :on-change="onUploadChange"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        Drop file here or <em>click to upload</em> your artifact here
        <br>
      </div>
    </el-upload>
    <div class="placeholder"
         v-loading="loading"
         element-loading-background="rgba(0, 0, 0, 0.1)"
         v-if="loading"/>
    <vue-tinymce
        v-model="content"
        :config="config"
    />
    <div class="button-group">
      <el-button type="primary" @click="submit">Submit</el-button>
    </div>
  </div>
</template>

<script>
import VueTinymce from "@panhezeng/vue-tinymce";
import {getCategories, addPost} from '@/api/work'
import {ElMessage} from 'element-plus'

export default {
  name: 'NewPost',
  components: {
    VueTinymce
  },
  created() {
    getCategories().then(res => {
      res = res['data']
      for (const idx in res){
        const obj = {
          value: idx,
          label: res[idx]
        }
        this.options.push(obj)
      }
    })
  },
  data(){
    return {
      loading: true,
      config: {
        language: 'enUS',
        code_dialog_height: 450,
        height: 300,
        init_instance_callback: this.editInited
      },
      title: '',
      content: '',
      options: [],
      selectedOption: '',
      file: ''
    }
  },
  methods: {
    editInited(){
      this.loading = false
    },
    onUploadChange(file) {
      this.file = file
    },
    handleExceed() {
      ElMessage.error("You can upload 1 image file at max")
    },
    submit() {
      const file = this.file.raw
      const title = this.title
      const description = this.content
      const category_name = this.options.length > 0 ? this.options[this.selectedOption]['label'] : null

      if (!file || !title || !description || !category_name){
        ElMessage.error("Please make sure you fill in every field")
      }
      else {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('title', title)
        formData.append('description', description)
        formData.append('category_name', category_name)
        addPost(formData).then(res => {
          ElMessage.success(res['msg'])
          setTimeout(() => {
            this.$router.push('/userProfile')
          }, 1000)
        })
      }
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 1280px;
  margin: 30px auto;
}

.placeholder {
  height: 300px;
  width: 100%;
}

.button-group {
  margin-top: 35px;
}

.upload >>> .el-upload--text{
  width: 100%;
}

.upload >>> .el-upload-dragger {
  width: 100%;
}
</style>
