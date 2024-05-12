// 封裝所有和用戶相關的接口函數
import request from "@/utils/http"

export const loginAPI = ({ account, password }) => {
  return request.post("/login", {
    account,
    password
  })
}

export const getLikeListAPI = ({ limit = 4 }) => {
  return request({
    url: '/goods/relevant',
    params: {
      limit
    }
  })
}
