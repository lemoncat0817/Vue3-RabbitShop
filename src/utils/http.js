// axios基礎的封裝
import axios from 'axios';
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import { useUserStore } from '@/stores/userStore'
import router from '@/router'



const httpInstance = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 1000000
})

// axios请求拦截器
httpInstance.interceptors.request.use(config => {
  // 使用pinia獲取token
  const userStore = useUserStore()
  // 將token添加到請求頭中
  const token = userStore.userInfo.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, e => Promise.reject(e))

// axios响应式拦截器
httpInstance.interceptors.response.use(res => res.data, e => {
  // 統一錯誤提示
  ElMessage.warning({ message: e.response.data.message })
  // 401token失效處理
  // 1.清除本地用戶數據
  // 2.跳轉到登錄頁
  if (e.response.status === 401) {
    const userStore = useUserStore()
    userStore.clearUserInfo()
    router.push('/login')
  }
  return Promise.reject(e)
})

export default httpInstance

