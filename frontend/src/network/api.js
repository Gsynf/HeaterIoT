import axios from './axios';
import Qs from "qs";

// 注册
export function requestRegister(params) {
  return axios({
    // header:{'Content-Type':'application/x-www-form-urlencoded'},
    method: 'post',
    url: '/adminregister',
    data: Qs.stringify(params)
  })
}
// 普通手机号密码登录
export function requestLogin(params) {
  return axios({
    // header:{'Content-Type':'application/x-www-form-urlencoded'},
    method: 'post',
    url: '/admintokens/amdinlogin1',
    data: Qs.stringify(params)
  })
}
// 短信验证码登录
export function requestMsgLogin(params) {
  return axios({
    // header:{'Content-Type':'application/x-www-form-urlencoded'},
    method: 'post',
    url: '/admintokens/adminlogin2',
    data: Qs.stringify(params)
  })
}
// 登录时发送短信验证码
export function requestMsgLoginValidate(params) {
  return axios({
    // header:{'Content-Type':'application/x-www-form-urlencoded'},
    method: 'post',
    url: '/adminmsgvalidatelogin',
    data: Qs.stringify(params)
  })
}
// 注册时发送短信验证码
export function requestMsgValidate(params) {
  return axios({
    // header:{'Content-Type':'application/x-www-form-urlencoded'},
    method: 'post',
    url: '/adminmsgvalidate',
    data: Qs.stringify(params)
  })
}
// 显示用户列表
export function getUserList(params) {
  return axios({
    method: 'post',
    url: '/users/list',
    data: Qs.stringify(params)
  })
}
