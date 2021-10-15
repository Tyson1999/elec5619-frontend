<template>
  <div id="captcha">
  </div>
</template>

<script>
import {ElMessage} from 'element-plus'
import {getGeetest} from '@/api/geetest'
import '../utils/gt'
export default {
  name: "Geetest",
  created() {
    this.initGeetest();
  },
  methods: {
    initGeetest() {
      getGeetest().then(res => {
        window.initGt({
          gt: res.gt,
          challenge: res.challenge,
          offline: !res.success,
          new_captcha: true,
          product: "float",
          width: "100%"
        }, (captchaObj) => {
          captchaObj.appendTo('#captcha')
          captchaObj.onSuccess(() => {
            const result = captchaObj.getValidate()
            this.$emit('validate_success', result)
          })
        })
      }).catch(err => {
        ElMessage.error(err.message)
      })
    }
  }
}
</script>

<style scoped>
#captcha{
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 15px;
  margin-bottom: 20px;
}
</style>
