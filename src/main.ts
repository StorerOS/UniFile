import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus  from 'element-plus'
import 'element-plus/dist/index.css'
import "animate.css"

import Particles from "particles.vue3"
createApp(App)
.use(ElementPlus)
.use(Particles)
.mount('#app')
