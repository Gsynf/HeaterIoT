import axios from './axios';
import Qs from "qs";

// 注册
export function requestRegister(params) {
  return axios({
    // header:{'Content-Type':'application/x-www-form-urlencoded'},
    method: 'post',
    url: '/register',
    data: Qs.stringify(params)
  })
}
// 普通手机号密码登录
export function requestLogin(params) {
  return axios({
    // header:{'Content-Type':'application/x-www-form-urlencoded'},
    method: 'post',
    url: '/tokens/login1',
    data: Qs.stringify(params)
  })
}
// 短信验证码登录
export function requestMsgLogin(params) {
  return axios({
    // header:{'Content-Type':'application/x-www-form-urlencoded'},
    method: 'post',
    url: '/tokens/login2',
    data: Qs.stringify(params)
  })
}
// 登录时发送短信验证码
export function requestMsgLoginValidate(params) {
  return axios({
    // header:{'Content-Type':'application/x-www-form-urlencoded'},
    method: 'post',
    url: '/msgvalidatelogin',
    data: Qs.stringify(params)
  })
}
// 注册时发送短信验证码
export function requestMsgValidate(params) {
  return axios({
    // header:{'Content-Type':'application/x-www-form-urlencoded'},
    method: 'post',
    url: '/msgvalidate',
    data: Qs.stringify(params)
  })
}
