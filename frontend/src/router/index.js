import Vue from 'vue'
import VueRouter from 'vue-router'

// 懒加载
const NotFound  = () => import('views/NotFound.vue');
const Login = () => import('views/home/Login.vue');
const MsgLogin = () => import('views/home/MsgLogin.vue')

// 1.安装插件
Vue.use(VueRouter)

// 2.创建路由对象
const routes = [
  {
    path: '',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/msglogin',
    component: MsgLogin
  },
  {
    path: '/404',
    component: NotFound,
  },
  // {
  //   path: '*',    // 此处需特别注意至于最底部
  //   redirect: '/404'
  // }
];

const router = new VueRouter({
    routes,
    // 设置为html的history模式
    mode: 'history'
});

// 3.导出
export default router

