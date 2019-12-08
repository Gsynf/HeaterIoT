import axios from './axios';
import Qs from "qs";

export function requestLogin(params) {
  return axios({
    // header:{'Content-Type':'application/x-www-form-urlencoded'},
    method: 'post',
    url: '/tokens/login1',
    data: Qs.stringify(params)
  })
}
export function requestMsgLogin(params) {
  return axios({
    // header:{'Content-Type':'application/x-www-form-urlencoded'},
    method: 'post',
    url: '/tokens/login2',
    data: Qs.stringify(params)
  })
}
export function requestMsgValidate(params) {
  return axios({
    // header:{'Content-Type':'application/x-www-form-urlencoded'},
    method: 'post',
    url: '/msgvalidatelogin',
    data: Qs.stringify(params)
  })
}
