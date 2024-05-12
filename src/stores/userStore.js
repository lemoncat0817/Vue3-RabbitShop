// 管理用戶相關數據
import { ref } from 'vue'
import { defineStore } from 'pinia'
import { loginAPI } from '@/apis/user'
import { mergeCartAPI } from '@/apis/cart'
import { useCartStore } from '@/stores/cartStore'


export const useUserStore = defineStore('user', () => {
    const userInfo = ref({})
    const cartStore = useCartStore()
    const getUserInfo = async ({ account, password }) => {
        const res = await loginAPI({ account, password })
        userInfo.value = res.result
        // 合併購物車
        await mergeCartAPI(cartStore.cartList.map(item => {
            return {
                skuId: item.skuId,
                count: item.count,
                selected: item.selected
            }
        }))
        cartStore.updateCartList()
    }

    // 退出時清除用戶訊息
    const clearUserInfo = () => {
        userInfo.value = {}
        // 執行清除購物車的action
        cartStore.clearCart()
    }
    return { userInfo, getUserInfo, clearUserInfo }
}, { persist: true })
