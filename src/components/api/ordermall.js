import axios from '@/fetch'

export function getmall (data) {
  return axios({
    url: "/mallorder/findbystatus",
    method: "post",
    params:data
  })
}

export function InvalidMall(data) {
  return axios({
    url: "/furnitureorder/cancel",
    method: "post",
    params:data
  })
}
