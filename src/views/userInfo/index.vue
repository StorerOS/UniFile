<template>
  <div class="tableContainer">
    <div class="heander">
      <div>Personal Information</div>
      <svg-icon icon-class="quit" @click.native="logout" />
    </div>
    <div class="tableList">
      <div class="header">Account Information</div>
      <div class="content">
        <div class="flex_box"><div>Mail:</div>{{ info.email || '' }}<span class="edit" @click="handleShowDialog('email')">Edit</span></div>
        <div class="flex_box"><div>Token:</div>**************<span class="edit" @click="handleShowDialog('token')">Edit</span></div>
        <div class="flex_box"><div>Password:</div>**************<span class="edit" @click="handleShowDialog('password')">Edit</span></div>
      </div>
    </div>
    <editDialog ref="editDialog" :type="type" @success="handleDialogSuccess" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { resetRouter } from '@/router'
import editDialog from './dialog'
import { accountInfo } from '@/api/user'

export default {
  components: {
    editDialog
  },
  data() {
    return {
      type: 'email',
      ex_rate: 'cny',
      rateList: ['cny', 'usd']
    }
  },
  computed: {
    ...mapGetters([
      'info'
    ])
  },
  mounted() {
    this.ex_rate = this.info.ex_rate
  },
  methods: {
    async logout() {
      await this.$store.dispatch('user/logout')
      resetRouter()
      // this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      this.$router.push('/login')
    },
    async handleDialogSuccess() {
      const userInofs = (await accountInfo()).data
      this.$store.dispatch('user/setInfo', userInofs)
    },
    handleShowDialog(type) {
      this.type = type
      this.$refs.editDialog.visible = true
    }
  }
}
</script>

<style lang="scss" scoped>
  .tableContainer{

    .title{
      font-size: 22px;
      font-weight: bold;
      border-bottom: 1px solid #ccc;
      padding: 20px 0;
      margin: 0 0 20px 0;
    }
    .heander{
      background-color: #fff;
      border-radius: 4px;
      padding: 20px;
      display: flex;
      justify-content: space-between;

      >div{
        font-size: 28px;
      }
      .svg-icon{
        width: 40px;
        height: 40px;
        margin-right: 20px;
      }
    }
    .tableList{
      background-color: #fff;
      border-radius: 4px;
      padding: 20px;
      margin: 10px 0 0;
      .header{
        display: flex;
        justify-content: space-between;
        font-size: 22px;
        margin:  0 0 20px;
        .svg-icon{
          margin-right: 10px;
        }
      }
    }
  }
  .flex_box,.el-form{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .content{
    width:500px;
    margin:0 auto;
    > div{
      line-height: 50px;
    }
    .edit{
      color: blue;
      margin-left: 10px;
    }
  }

</style>
