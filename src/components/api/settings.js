import axios from '@/fetch'

export function getreward(data) {
  return axios({
    url: "/recharge/getall",
    method: "post",
    data
  })
}

export function upreward(id,data) {
  return axios({
    url: "/recharge/setrecharge",
    method: "post",
    params:id,
    data: data,

  })
}

export function getCommission(data) {
  return axios({
    url: "/commission/getall",
    method: "post",
    data
  })
}

export function upCommission(id,data) {
  return axios({
    url: "/commission/setcommission",
    method: "post",
    params:id,
    data: data,
  })
}

