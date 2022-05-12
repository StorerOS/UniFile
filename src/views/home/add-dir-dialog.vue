
<template>
  <div>
    <el-dialog
      title="Add bucket"
      :visible.sync="visible"
      :close-on-click-modal="false"
      width="30%"
      @close="handleCloseForm"
    >
      <el-form ref="ruleForm" :model="addForm" label-width="120px">
        <el-form-item prop="bucket" label="bucket name：">
          <el-input v-model="addForm.bucket" placeholder="Please enter a bucket name" />
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="handleCloseForm">Cancel</el-button>
        <el-button type="primary" @click="handleSubmitForm">Confirm</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { addBucket } from '@/api/storageManagement'

export default {
  data() {
    return {
      addForm: {
        bucket: ''
      },
      visible: false,
      file: '',
      userList: [],
      rulus: {
      }
    }
  },
  methods: {
    handleCloseForm() {
      this.visible = false
      this.$refs.ruleForm.resetFields()
    },
    handleSubmitForm() {
      const { addForm } = this
      addBucket(addForm).then(res => {
        this.handleCloseForm()
        this.$message.success('Bucket created successfully')
        this.$emit('success')
      })
    }
  }
}
</script>

<style>

</style>
