import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import store from "./store/index";
import Vant from 'vant';
import 'vant/lib/index.css';
import '@/assets/css/index.less'
import '@/util/rem.js'
// import Vconsole from 'vconsole'

// const vConsole = new Vconsole();


const app = createApp(App)
app
.use(router)
.use(store)
.use(Vant)
.mount('#app')
