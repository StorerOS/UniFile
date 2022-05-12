<template>
  <span @click="getCode('')">
    {{ countdown == 0 ? 'verification code':countdown+'s' }}
  </span>
</template>

<script>
import { sendEmailCode, sendPhoneCode } from '@/api/user'
export default {
  name: 'Code',
  props: {
    type: {
      type: String,
      default: 'email'
    },
    data: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      countdownInterval: null,
      countdown: 0
    }
  },
  methods: {
    getCode() {
      const { countdown, countdownInterval, data, type } = this
      const func = type === 'email' ? sendEmailCode : sendPhoneCode
      const params = type === 'email' ? { email: data } : { phone_number: data }
      if (countdown === 0) {
        func(params).then(res => {
          this.$message.success('Verification code sent successfully')
          this.countdown = 120
          this.countdownInterval = setInterval(() => {
            if (this.countdown <= 0) {
              this.countdown = 0
              clearInterval(countdownInterval)
              return
            }
            this.countdown -= 1
          }, 1000)
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
