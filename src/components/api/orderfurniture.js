import axios from '@/fetch'

export function getFurniture (data) {
  return axios({
    url: "/furnitureorder/findbystatus",
    method: "post",
    params:data
  })
}

export function InvalidFurniture(data) {
  return axios({
    url: "/furnitureorder/cancel",
    method: "post",
    params:data
  })
}
