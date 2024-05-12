// 封裝購物車模塊
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useUserStore } from './userStore'
import { insertCartAPI, findNewCartListAPI, deleteCartAPI } from '@/apis/cart'

export const useCartStore = defineStore('cart', () => {
  const userStore = useUserStore()
  const isLogin = computed(() => userStore.userInfo.token)
  // 1.定義state - cartList
  const cartList = ref([])
  // 2.定義action - addCart

  // 獲取最新購物車列表action
  const updateCartList = async () => {
    const res = await findNewCartListAPI()
    cartList.value = res.result
  }

  const addCart = async (goods) => {
    const { skuId, count } = goods
    if (isLogin.value) {
      // 登入之後的加入購物車邏輯
      await insertCartAPI({ skuId, count })
      updateCartList()
    } else {
      // 思路: 透過goods的skuId能不能在cartList中找到相同的商品
      const item = cartList.value.find(item => item.skuId === goods.skuId)
      if (item) {
        item.count++
      } else {
        cartList.value.push(goods)
      }
    }
  }

  // 刪除購物車
  const delCart = async (skuId) => {
    if (isLogin.value) {
      await deleteCartAPI([skuId])
      updateCartList()
    } else {
      cartList.value = cartList.value.filter(item => item.skuId !== skuId)
    }
  }

  // 清除購物車列表
  const clearCart = () => {
    cartList.value = []
  }

  // 單選功能
  const singleCheck = (skuId, selected) => {
    // 透過skuId找到對應的商品
    cartList.value.find((item) => item.skuId === skuId).selected = selected
  }

  // 全選功能
  const allCheck = (selected) => {
    cartList.value.forEach((item) => item.selected = selected)
  }

  // 計算屬性
  // 1.總數量
  const totalCount = computed(() => {
    return cartList.value.reduce((acc, cur) => acc + cur.count, 0)
  })
  // 2.總金額
  const totalPrice = computed(() => {
    return cartList.value.reduce((acc, cur) => acc + cur.price * cur.count, 0)
  })
  // 已選擇數量
  const selectedCount = computed(() => {
    return cartList.value.reduce((acc, cur) => acc + (cur.selected ? cur.count : 0), 0)
  })
  // 已選擇價錢合計
  const selectedPrice = computed(() => {
    return cartList.value.reduce((acc, cur) => acc + (cur.selected ? cur.price * cur.count : 0), 0)
  })

  //是否全選
  const isAll = computed(() => {
    return cartList.value.every(item => item.selected)
  })

  return {
    cartList,
    addCart,
    delCart,
    totalCount,
    totalPrice,
    singleCheck,
    isAll,
    allCheck,
    selectedCount,
    selectedPrice,
    clearCart,
    updateCartList
  }
}, {
  persist: true
})