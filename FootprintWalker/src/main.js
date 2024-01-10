/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'
import axios from "axios";
import $ from "jquery";


// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

const app = createApp(App)

registerPlugins(app)


app.config.globalProperties.$ = $;

// 设置全局配置
app.config.globalProperties.$http = axios;
// 本地环境
axios.defaults.baseURL = "http://localhost:8090";

const axiosForActivity = axios.create({
    baseURL: 'http://localhost:9091'
});

// axios.defaults.baseURL = "/target"
// axios.defaults.baseURL = "http://localhost:8090/api/"

app.mount('#app')

export { axiosForActivity };
