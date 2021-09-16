<script setup lang="ts">
import { Web3Storage as web3 } from 'web3.storage'
import { ref } from "vue";

const token:any = ref(localStorage.getItem('token'))

if(!token){
  this.$message({
      type:'error',
      message:''
  })
}
const client = new web3({ token })
async function uploadImg(file:any){
     const a = await client.put([file.file],{
        name:'123123'
      })
}

async function getList(){
  const client = new web3({ token })
  const uploadNames = []
  for await (const item of client.list({ maxResults: 10 })) {
      // console.log(JSON.stringify(item))
      uploadNames.push(item)
  }
  
}


// const client = new web3({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGI4QTAxNjhmZDRlNWI1Y0M5OTIzMkZiMzY1YTdhODQ1MTU0OEZlREEiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2MzExNzgzNDc2MTQsIm5hbWUiOiJOTXp6In0.AQxWXYfGnyJX-xTMTBtOZLC5obxLFSXJtvdYpjaeGrI' })
// const res:any = await client.get('bafybeianslwqs4obatszrqlphzhfbtzmsaz7oar6sdeqtvxfw3x2uq6snq') // Web3Response
// const files = await res.files() // Web3File[]
// for (const file of files) {
//   console.log(`${file.cid} ${file.name} ${file.size}`)
// }
defineProps<{ show: Boolean }>();

</script>

<template>
  <div class="container" v-show="show">
    <el-upload class="upload-demo" multiple :limit="3" :http-request="uploadImg">
      <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>
  </div>
</template>

<style scoped>
.container {
  width: 90vw;
  height: 80vh;
  background-color: #fafafa;
  border-radius: 10px;
  position: absolute;
  left: 0;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  margin: 0 auto;
  z-index: 199;
  text-align: left;
  padding: 15px 20px;
}
</style>
