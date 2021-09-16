<script setup  lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { onMounted } from '@vue/runtime-core';
import particlesOpt from './config/particles.json'
import HelloWorld  from './components/HelloWorld.vue'
import { Web3Storage as web3 } from 'web3.storage'

onMounted(()=>{
  const tip = document.querySelector('.hellword') as HTMLElement;
  tip.classList.add('animate__animated', 'animate__zoomInDown');
  tip.style.setProperty('--animate-duration', '1s');
  tip.style.setProperty('--animate-delay', '1s');

  const content = document.querySelector('.content') as HTMLElement;
  content.classList.add('animate__animated', 'animate__zoomIn');
  tip.style.setProperty('--animate-duration', '1s');
})
 async function handleSaveToken(){
   const client = new web3({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGI4QTAxNjhmZDRlNWI1Y0M5OTIzMkZiMzY1YTdhODQ1MTU0OEZlREEiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2MzExNzgzNDc2MTQsIm5hbWUiOiJOTXp6In0.AQxWXYfGnyJX-xTMTBtOZLC5obxLFSXJtvdYpjaeGrI' })
   const uploadNames = []
  //  for await (const item of client.list({ maxResults: 10 })) {
  //     uploadNames.push(item.name)
  //   }
    try{
      const uploadNames = []
   for await (const item of client.list({ maxResults: 10 })) {
      uploadNames.push(item.name)
    }
    }catch(err){
      console.log(err)
    }
   
 }

</script>

<template>
  <div id="app">
    <Particles class="particles" id="tsparticles" :options="particlesOpt"/>
    <div  class="container">
      <div  class="hellword">Welcome to Web3Storage</div>
      <div class="content animate__delay-3s">
        <div class="token"><input type="text"  placeholder="Enter your token"><div class="btn" @click="handleSaveToken()">Submit</div></div>
        <div class="tip">If you don't have a token,<a href="https://web3.storage/login/" target="_blank">click here!</a></div>
      </div>
    </div>
    <HelloWorld :show="true"></HelloWorld>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
}
.particles{
  width: 100%;
  height: 100vh;
  position:absolute;
  z-index: 1;
  left: 0;
  /* right:0;
  top: 50%;
  margin:0 auto;
  transform: translateY(-50%); */
}
body{
  padding:0;
  margin:0;
}
.container{
  position:relative;
  width: 100%;
  height: 100vh;
}
.hellword{
   font-size: 60px;
  color: #fff;
  line-height: 100vh;
  z-index: 99;
  position:relative;
  font-weight: bold;
}
.content{
  width: 800px;
  background-color: #fafafa;
  border-radius: 10px;
  position:absolute;
  left: 0;
  top:50%;
  right:0;
  transform: translateY(-50%);
  margin:0 auto;
  z-index: 99;
  padding:15px 20px;
}
.content .token{
  display: flex;
  align-items: center;
}
.content .tip{
  text-align: left;
  margin: 10px 0 0 0;
}
input{
    border: 1px solid #ccc;
    padding: 7px 0px;
    border-radius: 3px;
    padding-left:5px;
    -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
    -webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
    -o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s
}
input{
  width: 80%;
  height: 30px;
}
.btn{
  margin:0 20px;
  height: 40px;
  cursor:pointer;
  line-height: 40px;
  padding:0 40px;
  font-weight: bold;
  border-radius: 5px;
  color: #fff;
  background-color: green;
}
input:focus{
    border-color: #66afe9;
    outline: 0;
    -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6);
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6)
}
</style>
