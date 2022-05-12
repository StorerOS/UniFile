<template>
  <div class="detailContainer">
    <div class="header">
      <div class="title">File List</div>
    </div>
    <div class="switchCard">
      <div class="flex_box_btw">
        <div class="flex_box_btw content_left_btns">
          <el-button type="primary" size="default" @click="handleGetData"><svg-icon icon-class="refush" class="refush" />Refresh</el-button>
          <el-button v-if="bucket.id" size="default" @click="goBack">Back</el-button>
        </div>
        <div class="content_right_btns">
          <div class="float_box_right">
            <svg-icon v-if="!bucket.id" icon-class="add" @click="showDialog" />
            <el-upload
              v-if="bucket.id"
              action=""
              multiple
              :show-file-list="false"
              :http-request="handleUploadFile"
            >
              <svg-icon icon-class="upload" />
            </el-upload>
          </div>
          <div class="search_btn">
            <el-input v-model="sub_string" placeholder="" size="normal" clearable>
              <div slot="suffix" class="search_icon" @click="handleGetData(true)">
                <svg-icon icon-class="icon_find" />
              </div>
            </el-input>
          </div>
        </div>
      </div>
      <div>
        <el-table :hidden="bucket.id" :data="bucketList" border stripe>
          <el-table-column prop="bucket" label="bucket name" />
          <el-table-column label="number of files" prop="size" />
          <el-table-column prop="volume_used" label="use capacity(MB)" />
          <el-table-column prop="updated_time" label="update time" />
          <el-table-column label="operate">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleDeleteBucket(scope.row)">Delete</el-button>
              <el-button type="text" size="small" @click="hangdleEnterDir(scope.row)">Enter</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-table :hidden="!bucket.id" :data="fileList" border stripe>
          <el-table-column prop="file_name" label="object name" />
          <el-table-column prop="file_size" label="file size" />
          <el-table-column label="operate">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleDownloadRes(scope.row)"><a
                :href="'https://dweb.link/ipfs/' + scope.row.cid"
                target="_blank"
                type="text"
                size="small"
              >Download</a></el-button>

              <el-button type="text" size="small" @click="handleDeleteFile(scope.row)">Delete</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <add-dir-dialog ref="addDirDialog" @success="getBucket" />
  </div>
</template>

<script>
import { getBucketList, delBucket, getFileList, addFile, delFile } from '@/api/storageManagement'
import addDirDialog from './add-dir-dialog.vue'
import { Web3Storage } from 'web3.storage/dist/bundle.esm.min.js'
import { mapGetters } from 'vuex'
import { Loading } from 'element-ui'
export default {
  components: { addDirDialog },
  data() {
    return {
      bucket: '',
      bucketList: [],
      fileList: [],
      sub_string: '',
      client: null
    }
  },
  created() {
    this.getBucket()
    // this.info = this.$route.params.info
    // this.getTableList()
  },
  computed: {
    ...mapGetters(['info'])
  },
  mounted() {
    const { info } = this
    this.client = new Web3Storage({ token: info.token })
  },
  methods: {

    getBucket() {
      const { sub_string } = this
      getBucketList({ sub_string }).then(res => {
        this.bucketList = res.data.list
      })
    },
    goBack() {
      this.bucket = ''
      this.getBucket()
    },
    getFile() {
      const { bucket, sub_string } = this
      getFileList({ bucket_id: bucket.id, sub_string }).then(res => {
        this.fileList = res.data.list
      })
    },
    hangdleEnterDir(row) {
      this.bucket = row
      this.getFile()
    },

    async handleUploadFile(file) {
      const { info, bucket, client } = this
      if (!info.token) {
        this.$message.warning('Please upload token')
        this.$router.push('/userInfo')
        return
      }
      const loadingInstance = Loading.service({ fullscreen: true })

      try {
        const cid = await client.put([file.file], {
          maxRetries: 3
        })
        await addFile({
          bucket_id: bucket.id,
          file_name: file.file.name,
          file_size: file.file.size,
          cid: cid
        })

        this.$message.success('Uploaded file successfully')
        this.getFile()
        loadingInstance.close()
      } catch (err) {
        console.log(err)
        loadingInstance.close()
      }
    },
    handleDeleteBucket(row) {
      this.$confirm('Are you sure you want to delete this bucket？', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'error'
      }).then(() => {
        delBucket({
          bucket_id: row.id
        }).then(res => {
          this.$message.success('The bucket has been deleted！')
          this.getBucket()
        })
      })
    },
    handleDeleteFile(row) {
      const { bucket, client } = this
      this.$confirm('Are you sure you want to delete this file？', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'error'
      }).then(async() => {
        const loadingInstance = Loading.service({ fullscreen: true })
        // await client.delete(row.cid)
        await delFile({
          bucket_id: bucket.id,
          cid: row.cid
        })
        this.$message.success('The file has been deleted！')
        loadingInstance.close()
        this.getFile()
      })
    },
    showDialog() {
      this.$refs.addDirDialog.visible = true
    },
    handleGetData(hasKey = false) {
      const { bucket } = this
      if (bucket.id) {
        this.getFile()
      } else {
        this.getBucket()
      }
      if (hasKey) this.sub_string = ''
    }
  }

}
</script>

<style lang="scss" scoped>
.detailContainer{
    .header{
        background-color: #fff;
        border-radius: 4px;
        padding: 20px;
        .title{
          font-size: 18px;
          font-weight: bold;
        }
        .info{
          display: flex;
          div{
            margin:20px 30px 20px 0;
          }
        }
    }
    .el-button{
        .svg-icon{}
    }
    .switchCard{
        background-color: #fff;
        border-radius: 4px;
        padding: 20px;
        margin: 10px 0 0;
        .content_left_btns{
          width: 200px;
          .refush{
            color: #ffffff;
          }
          .svg-icon{
            margin-right: 15px;
          }
        }
        .content_right_btns{
          clear:both;
          .svg-icon{
            margin-right: 15px;
            font-size: 32px;
          }
          .float_box_right{
            margin:10px 0;
            float: right;
            display: flex;
          }
          .search_btn{
            clear: both;
            position: relative;
            .el-input{
              width: 400px;
              padding: 0 45px;
            }
            .search_icon{
              position: absolute;
              right: -5px;
              width: 50px;
              text-align: center;
              height: 100%;
              background-color: #0079fe;
              border-radius: 0 4px 4px 0;
            }
            .svg-icon{
                font-size: 25px;
                margin: 8px 5px;
                vertical-align: middle;
                color: #fff;
              }
          }

        }
        .el-table{
          margin: 30px 0;
        }
    }
    .setting{
      .item{width: 100%;}
      .title{
        border: 1px solid #f0f0f0;
        font-size: 18px;
        padding: 15px 10px;
      }
      .svg-icon{
        width: 15px;
      }
      .flex_box{
        display: flex;
        align-items: center;
      }
      .form{
        padding:  0 20px;
        height: 100px;
        .el-input{
          width: 120px;
          margin: 0 20px;
        }
      }
    }
    .btn_save{
      margin: 40px auto;
      text-align: center;
    }
    .local{
      display: flex;
    }
}

</style>
