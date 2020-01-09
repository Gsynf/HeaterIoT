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
// 登录成功后获取管理员信息
export function getAdminInfo(params) {
  return axios({
    method: 'post',
    url: '/admininfo',
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
// 显示用户列表
export function getUserListPage(params) {
  return axios({
    method: 'post',
    url: '/users/listpage',
    data: Qs.stringify(params)
  })
}
// 显示设备列表
export function getDeviceShowList(params) {
  return axios({
    method: 'post',
    url: '/deviceshowinfo',
    data: Qs.stringify(params)
  })
}
// 显示设备设置
export function getDeviceSetting(params) {
  return axios({
    method: 'post',
    url: '/devicesetting',
    data: Qs.stringify(params)
  })
}
// 设备设置
export function editDevice(params) {
  return axios({
    method: 'post',
    url: '/editdevice',
    data: Qs.stringify(params)
  })
}
//激活设备
export function editActiveDuration(params) {
  return axios({
    method: 'post',
    url: '/editactiveduration',
    data: Qs.stringify(params)
  })
}
