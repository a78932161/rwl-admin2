import axios from '@/fetch'

export function addRecharge(data) {
  return axios({
    url: "/guidecard/save",
    method: "post",
    data
  })
}

export function getAll(data) {
  return axios({
    url: "/guidecard/findall",
    method: "post",
    params:data
  })
}

export function getphone(data) {
  return axios({
    url: "/user/findbyregisterphone",
    method: "post",
    params:data
  })
}


export function addRefund(data) {
  return axios({
    url: "/refund/save",
    method: "post",
    data
  })
}

export function getRefund(data) {
  return axios({
    url: "/refund/findall",
    method: "post",
    params:data
  })
}

export function idRecharge(data) {
  return axios({
    url: "/guidecard/findone",
    method: "post",
    params:data
  })
}

export function idRefund(data) {
  return axios({
    url: "/refund/findone",
    method: "post",
    params:data
  })
}

export function findRefund(data) {
  return axios({
    url: "/refund/findbyphone",
    method: "post",
    params:data
  })
}
export function findRecharge(data) {
  return axios({
    url: "/guidecard/findbyphone",
    method: "post",
    params:data
  })
}





