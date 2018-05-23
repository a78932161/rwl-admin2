import axios from '@/fetch'

export function xyinquire(data) {
  return axios({
    url: "/laundryorder/findbytypeandstatusandarea",
    method: "post",
    params: data
  })
}

export function jjinquire(data) {
  return axios({
    url: "/furnitureorder/findbystatusandarea",
    method: "post",
    params: data
  })
}


export function scinquire(data) {
  return axios({
    url: "/mallorder/findbystatusandarea",
    method: "post",
    params: data
  })
}

export function xycx(data) {
  return axios({
    url: "/laundryorder/findbynumber",
    method: "post",
    params: data
  })
}

export function jjcx(data) {
  return axios({
    url: "/furnitureorder/findbynumber",
    method: "post",
    params: data
  })
}

export function sccx(data) {
  return axios({
    url: "/mallorder/findbynumber",
    method: "post",
    params: data
  })
}





