<template>
  <el-drawer
      v-model="show_drawer"
      :title="title"
      :before-close="handleClose"
      :artifact="artifact"
      direction="rtl"
  >
    <div v-html="description" style="margin: 0 20px"></div>
    <el-button type="primary" style="margin-top: 20px;" @click="download">Download the artifact</el-button>
  </el-drawer>
</template>

<script>
import { ElMessageBox } from 'element-plus'
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    artifact: {
      type: String,
      default: ''
    }
  },
  emits: ['closeDrawer'],
  data() {
    return {
      show_drawer: false,
    }
  },
  watch: {
    show: {
      immediate: true,
      handler(val){
        this.show_drawer = val
      }
    }
  },
  methods: {
    handleClose() {
       ElMessageBox.confirm('Are you sure you want to close this article?')
           .then(() => {
             this.$emit("closeDrawer")
           })
           .catch(() => {})
     },
    download() {
      window.open(process.env.VUE_APP_BASE_API + this.artifact,'_blank')
    }
  }
}
</script>

<style scoped>

</style>
