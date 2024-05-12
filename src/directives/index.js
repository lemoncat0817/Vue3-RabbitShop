// 定義懶加載插件
import { useIntersectionObserver } from '@vueuse/core'

export const lazyPlugin = {
  // 插件的install方法
  install(app) {
    app.directive('img-lazy', {
      mounted(el, binding) {
        // el: 指令綁定的那個元素
        // binding: 一個對象，包含指令相關的所有信息
        const { stop } = useIntersectionObserver(
          el,
          ([{ isIntersecting }]) => {
            if (isIntersecting) {
              // 进入视口区域
              el.src = binding.value
              stop()
            }
          },
        )
      }
    })
  }
}