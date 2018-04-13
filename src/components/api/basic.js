import axios from '@/fetch'

export function loginApi (data) {
  return axios({
    url: "/login",
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    method: "post",
    data
  })
}
