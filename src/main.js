import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'


// 引入懶加載插件
import { lazyPlugin } from '@/directives/index'

// 引入初始化樣式
import '@/styles/common.scss'

// 引入全局組件插件
import { componentsPlugin } from '@/components/index'



const app = createApp(App)
const pinia = createPinia()
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(pinia.use(piniaPluginPersistedstate))
app.use(router)
app.use(lazyPlugin)
app.use(componentsPlugin)
app.mount('#app')


