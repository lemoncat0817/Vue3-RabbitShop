import axios from 'axios'
import request from '@/utils/http'


export const getCityListAPI = async () => {
  const res = await axios.get('https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json');
  return res
}

export const createAddressAPI = (data) => {
  return request({
    url: '/member/address',
    method: 'POST',
    data
  })
}