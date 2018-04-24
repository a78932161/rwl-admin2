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






