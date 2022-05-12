
<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="visible"
      :close-on-click-modal="false"
      width="45%"
      @close="handleCloseForm"
    >
      <el-form v-if="type == 'password'" ref="passwordFormData" :rules="rules" :model="passwordFormData" label-width="150px">
        <el-form-item label="old password：" prop="old_password">
          <div class="content">
            <el-input v-model="passwordFormData.old_password" show-password placeholder="" />
          </div>
        </el-form-item>
        <el-form-item label="New password：" prop="new_password">
          <div class="content">
            <el-input v-model="passwordFormData.new_password" show-password placeholder="" />
          </div>
        </el-form-item>
        <el-form-item label="Confirm password:" prop="repectPassword">
          <div class="content">
            <el-input v-model="passwordFormData.repectPassword" show-password placeholder="" />
          </div>
        </el-form-item>
      </el-form>
      <el-form v-if="type == 'email'" ref="emailFormData" :rules="rules" :model="emailFormData" label-width="150px">
        <el-form-item label="Old mailbox:">
          <div class="content">
            <el-input v-model="info.email" disabled />
          </div>
        </el-form-item>
        <el-form-item label="Verification code:" prop="old_code">
          <div class="content">
            <el-input v-model="emailFormData.old_code" placeholder="" />
            <get-code class="show-pwd col_blue" :data="info.email" />
          </div>
        </el-form-item>
        <el-form-item label="New mailbox:" prop="new_email">
          <div class="content">
            <el-input v-model="emailFormData.new_email" placeholder="" />
          </div>
        </el-form-item>
        <el-form-item label="Verification code:" prop="new_code">
          <div class="content">
            <el-input v-model="emailFormData.new_code" placeholder="" />
            <get-code class="show-pwd col_blue" :data="emailFormData.new_email" />
          </div>
        </el-form-item>
      </el-form>
      <el-form v-if="type == 'phone'" ref="phoneFormData" :rules="rules" :model="phoneFormData" label-width="150px">
        <el-form-item label="Phone Number：" prop="phone_number">
          <div class="content">
            <el-input v-model="phoneFormData.phone_number" placeholder="" />
          </div>
        </el-form-item>
        <el-form-item label="Verification code:" prop="code">
          <div class="content">
            <el-input v-model="phoneFormData.code" placeholder="" />
            <get-code class="show-pwd col_blue" :data="phoneFormData.phone_number" type="phone" />
          </div>
        </el-form-item>
      </el-form>
      <el-form v-if="type == 'token'" ref="tokenFormData" :rules="rules" :model="tokenFormData" label-width="150px">
        <el-form-item label="Mailbox：">
          <div class="content">
            <el-input v-model="info.email" disabled />
          </div>
        </el-form-item>
        <el-form-item label="Token:" prop="token">
          <div class="content">
            <el-input v-model="tokenFormData.token" placeholder="" />
          </div>
        </el-form-item>
        <div class="tip">If you don't have a token,<a href="https://web3.storage/login/" target="_blank">click here!</a></div>
      </el-form>
      <span slot="footer">
        <el-button @click="handleCloseForm">Cancel</el-button>
        <el-button type="primary" @click="handleSubmitForm">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { changePassword, changeEmail, changePhone, changeToken } from '@/api/user'
import { Web3Storage } from 'web3.storage/dist/bundle.esm.min.js'
import { Loading } from 'element-ui'

import { mapGetters } from 'vuex'
import getCode from './code.vue'
import md5 from 'js-md5'
import rules from './rules'

export default {
  name: 'EditUserInfoDialog',
  components: {
    getCode
  },
  props: {
    type: {
      type: String,
      default: 'email'
    }
  },
  data() {
    return {
      visible: false,
      countdown: 0,
      passwordFormData: {
        repectPassword: '',
        old_password: '',
        new_password: ''
      },
      tokenFormData: {
        token: ''
      },
      emailFormData: {
        old_code: '',
        new_email: '',
        new_code: ''
      },
      phoneFormData: {
        phone_number: '',
        code: ''
      },
      rules
    }
  },
  computed: {
    ...mapGetters([
      'info'
    ]),
    title() {
      const { type } = this
      let content = ''
      switch (type) {
        case 'email':
          content = 'Modify email'
          break
        case 'token':
          content = 'Modify token'
          break
        case 'phone':
          content = 'Modify phone number'
          break
        case 'password':
          content = 'change Password'
          break
      }
      return content
    }
  },
  methods: {
    handleCloseForm() {
      this.visible = false
    },
    handleSubmitForm() {
      switch (this.type) {
        case 'email':
          this.handleChangeOtherInfo('emailFormData', changeEmail)
          break
        case 'token':
          this.handlChangeToken('tokenFormData', changeToken)
          break
        case 'phone':
          this.handleChangeOtherInfo('phoneFormData', changePhone)
          break
        case 'password':
          this.handleChangePassword()
          break
      }
    },
    handleChangeOtherInfo(formData, func) {
      this.$refs[formData].validate(valid => {
        if (valid) {
          func(this[formData]).then(res => {
            this.$message.success('Successfully modified')
            this.$emit('success')
            this.handleCloseForm()
          })
        }
      })
    },
    handlChangeToken(formData, func) {
      const loadingInstance = Loading.service({ fullscreen: true })

      this.$refs[formData].validate(async valid => {
        if (valid) {
          const client = new Web3Storage({ token: this[formData].token })
          try {
            for await (const item of client.list({ maxResults: 1 })) {}
          } catch (err) {
            this.$message.error('Please fill in the correct token')
            loadingInstance.close()
            return
          }
          loadingInstance.close()
          func(this[formData]).then(res => {
            this.$message.success('Successfully modified')
            this.$emit('success')
            this.handleCloseForm()
          })
        }
      })
    },
    handleChangePassword() {
      const { info } = this
      const { new_password, old_password, repectPassword } = this.passwordFormData
      if (new_password !== repectPassword) {
        this.$message.error('Inconsistent password entered twice')
        return
      }
      const params = {
        email: info.email,
        new_password: md5(new_password),
        old_password: md5(old_password)
      }
      changePassword(params).then(async(res) => {
        this.$message.success('Password changed successfully')
        await this.$store.dispatch('user/logout')
        // this.$router.push(`/login?redirect=${this.$route.fullPath}`)
        this.$router.push('/login')
      })
    }

  }

}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";
.show-pwd {
    position: absolute;
    right: 10px;
    top: 8px;
    font-size: 16px;
    color: $colorTextSecondary;
    cursor: pointer;
    user-select: none;
  }
.col_blue{
    color: $colorPrimary;
    cursor: pointer;
  }
.content{
  position: relative;
  .flex_box{
    position:absolute;
    right: 20px;
    top: 10px;
    font-size: 20px;
    .svg-icon{
      margin-left: 20px;
    }
  }
}
.tip{
  text-align: right;
  a{
    color: #0079FE;
  }
}
</style>
