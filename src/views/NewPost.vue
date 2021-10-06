<template>
  <div class="container">
    <vue-tinymce v-model="value" :config="config"/>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
const VueTinymce = defineAsyncComponent(() => import("@panhezeng/vue-tinymce"));
export default {
  name: 'NewPost',
  components: {
    VueTinymce
  },
  data(){
    return {
      config: {
        language: 'enUS',
        code_dialog_height: 450, // 代码框高度 、宽度
      },
      value: ''
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 1280px;
  margin: 0 auto;
}
</style>
