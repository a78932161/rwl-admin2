import axios from '@/fetch'

export function getclearing(data) {
  return axios({
    url: "/statistical/storestatistical",
    method: "post",
    params:data
  })
}


export function getclearingds(data) {
  return axios({
    url: "/statistical/storedayanalysis",
    method: "post",
    params:data
  })
}
