import Vue from 'vue'
import VueRouter from 'vue-router'

// 解决重复点击导航栏报错NavigationDuplicated
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};

// 懒加载
const NotFound  = () => import('views/NotFound.vue');
const Login = () => import('views/home/Login.vue');
const MsgLogin = () => import('views/home/MsgLogin.vue');
const Register = () => import('views/home/Register.vue');
const MainPage = () => import('views/MainPage.vue');
const User =() => import('views/user/User.vue');
const UserTable =() => import('views/user/UserTable.vue');
const DeviceShow =() => import('views/device/DeviceShow.vue');
const Echarts =() => import('views/charts/Echarts.vue');
// 1.安装插件
Vue.use(VueRouter);

// 2.创建路由对象
const routes = [
  {
    path: '',
    redirect: '/login',
    name: '',
    hidden: true
  },
  {
    path: '/login',
    component: Login,
    name: '',
    hidden: true
  },
  {
    path: '/msglogin',
    component: MsgLogin,
    name: '',
    hidden: true
  },
  {
    path: '/register',
    component: Register,
    name: '',
    hidden: true
  },
  {
    path: '/main',
    component: MainPage,
    name: '用户列表',
    iconCls: 'el-icon-user',
    children: [
      { path: '/main/userlist', component: User, name: '列表' },
      { path: '/main/userpage', component: UserTable, name: '分页' },
    ]
  },
  {
    path: '/main',
    component: MainPage,
    name: '设备',
    iconCls: 'el-icon-cpu',
    children: [
      { path: '/main/deviceshow', component: DeviceShow, name: '设备运行' },
    ]
  },
  {
    path: '/main',
    component: MainPage,
    name: '运行数据',
    iconCls: 'el-icon-data-analysis',
    children: [
      { path: '/main/charts', component: Echarts, name: '数据' },
    ]
  },

  {
    path: '/404',
    component: NotFound,
    name: '',
    hidden: true
  },
  // {
  //   path: '*',    // 此处需特别注意至于最底部
  //   redirect: '/404'
  // }
];

const router = new VueRouter({
    routes,
    // 设置为html的history模式
    mode: 'history',
    base: "/heater"
});

// 3.导出
export default router

