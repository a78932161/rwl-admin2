import axios from '@/fetch'

export function getAgents(data) {
  return axios({
    url: "/agent/findall",
    method: "post",
    params:data
  })
}

export function addAgents(data) {
  return axios({
    url: "/agent/save",
    method: "post",
    params:data
  })
}
export function upAgents(data) {
  return axios({
    url: "/agent/update",
    method: "post",
    params:data
  })
}
