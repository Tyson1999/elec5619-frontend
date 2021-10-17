<template>
  <el-drawer
      v-model="drawer"
      title="I am the title"
      :direction="direction"
      :before-close="handleClose"
  >
    <span>Hi, there!</span>
  </el-drawer>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ElMessageBox } from 'element-plus'

export default defineComponent({
  setup() {
    const drawer = ref(false)
    const direction = ref('rtl')
    const handleClose = (done) => {
      ElMessageBox.confirm('Are you sure you want to close this?')
          .then(() => {
            done()
          })
          .catch(() => {
            // catch error
          })
    }
    return {
      drawer,
      direction,
      handleClose,
    }
  },
})
</script>

<style scoped>

</style>
