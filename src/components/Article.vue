<template>
  <el-drawer
      v-model="show_drawer"
      :title="title"
      direction="rtl"
      :before-close="handleClose"
  >
    <div v-html="description"></div>
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
     }
  }
}
</script>

<style scoped>

</style>
