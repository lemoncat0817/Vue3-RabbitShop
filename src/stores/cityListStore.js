import { defineStore } from "pinia"
import { ref, onMounted, computed } from "vue"
import { getCityListAPI, createAddressAPI } from "@/apis/cityList.js"
import { ElMessage } from "element-plus"



export const useCityListStore = defineStore("cityList", () => {
  // 定义数据
  const list = ref([])
  const getCityList = async () => {
    const res = await getCityListAPI()
    list.value = res.data
  }

  const changeResult = ref({
    receiver: "",
    contact: "",
    provinceCode: "",
    cityCode: "",
    countyCode: "",
    address: "",
    postalCode: "",
    addressTags: "",
    isDefault: 1,
    fullLocation: ""
  })

  const isDone = ref(true)

  const addAddress = async () => {
    await createAddressAPI(changeResult.value)
    ElMessage.success('添加地址成功')
  }

  const selectCity = (city) => {
    if (city.level === 0) {
      changeResult.value.provinceCode = city.code
      changeResult.value.provinceName = city.name
    } else if (city.level === 1) {
      changeResult.value.cityCode = city.code
      changeResult.value.cityName = city.name
    } else if (city.level === 2) {
      changeResult.value.countyCode = city.code
      changeResult.value.countyName = city.name
      changeResult.value.fullLocation = `${changeResult.value.provinceName} ${changeResult.value.cityName} ${changeResult.value.countyName}`;
      console.log(changeResult.value.fullLocation)
      isDone.value = true
    }
  }

  const cityList = computed(() => {
    let result = list.value
    if (changeResult.value.provinceCode && changeResult.value.provinceName) {
      result = result.find((item) => item.code === changeResult.value.provinceCode).areaList
    }
    if (changeResult.value.cityCode && changeResult.value.cityName) {
      result = result.find((item) => item.code === changeResult.value.cityCode).areaList
    }
    return result
  })

  onMounted(async () => {
    await getCityList()
  })

  return {
    cityList,
    getCityList,
    changeResult,
    selectCity,
    list,
    addAddress,
    isDone
  }
})