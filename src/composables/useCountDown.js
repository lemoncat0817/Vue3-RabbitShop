// 封裝倒數計時的邏輯函數
import { ref, computed, onUnmounted } from 'vue'
import dayjs from 'dayjs'

export const useCountDown = () => {
  // 1.響應式數據
  const time = ref(0)
  let timer = null
  // 格式化時間 為 XX分XX秒
  const formatTime = computed(() => dayjs.unix(time.value).format('mm分ss秒'))
  // 2.開啟倒數計時的函數
  const start = (currentTime) => {
    // 開始倒數計時的邏輯
    // 核心邏輯的編寫:每隔一秒就減一
    time.value = currentTime
    timer = setInterval(() => {
      time.value--
    }, 1000)
  }
  // 組件銷毀時清除定時器
  onUnmounted(() => {
    timer && clearInterval(timer)
  })
  return {
    formatTime,
    start
  }
}