// 把components文件夹下的所有组件進行全局化註冊
// 透過插件的方式
import ImageView from './ImageView/index.vue'
import Sku from './XtxSku/index.vue'

export const componentsPlugin = {
  install(app) {
    // app.component('組件名字', 組件配置物件) 
    app.component('XtxImageView', ImageView)
    app.component('XtxSku', Sku)
  }
}
