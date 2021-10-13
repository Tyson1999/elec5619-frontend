<template>
  <div class="container">
    <el-input v-model="title" placeholder="Enter the title here"/>
    <div class="placeholder"
         v-loading="loading"
         element-loading-background="rgba(0, 0, 0, 0.1)"
         v-if="loading"/>
    <vue-tinymce
        v-model="content"
        :config="config"
    />
    <div class="button-group">
      <el-button>Save draft</el-button>
      <el-button type="primary">Submit</el-button>
    </div>
  </div>
</template>

<script>
import VueTinymce from "@panhezeng/vue-tinymce";
export default {
  name: 'NewPost',
  components: {
    VueTinymce
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
      content: ''
    }
  },
  methods: {
    editInited(){
      this.loading = false
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
</style>
