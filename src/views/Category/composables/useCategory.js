// 封裝分類數據相關業務代碼
import { getCategoryAPI } from '@/apis/category'
import { ref, onMounted } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'


export const useCategory = () => {
  const categoryData = ref([])
  const route = useRoute()
  const getCategory = async (id = route.params.id) => {
    const res = await getCategoryAPI(id)
    categoryData.value = res.result
  }

  onMounted(() => {
    getCategory()
  })

  // 目標:路由參數變化的時候，可以把分類數據接口重新發送
  onBeforeRouteUpdate((to) => {
    getCategory(to.params.id)
  })

  return { categoryData }
}