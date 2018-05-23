import axios from '@/fetch'

export function getclearing(data) {
  return axios({
    url: "/statistical/storestatistical",
    method: "post",
    params:data
  })
}
