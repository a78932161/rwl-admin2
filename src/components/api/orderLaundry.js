import axios from '@/fetch'

export function getlaundry(data) {
  return axios({
    url: "/laundryorder/findbytypeandstatus",
    method: "post",
    params:data
  })
}
export function Invalidlaundry(data) {
  return axios({
    url: "/laundryorder/cancel",
    method: "post",
    params:data
  })
}

export function outlaundry(data) {
  return axios({
    url: "/laundryorder/findbytimeoutandtype",
    method: "post",
    params:data
  })
}


