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

export function deliveryFurniture(data) {
  return axios({
    url: "/store/findall",
    method: "post",
    params:data
  })
}

export function distributionFurniture(data) {
  return axios({
    url: "/furnitureorder/delivery",
    method: "post",
    params:data
  })
}

