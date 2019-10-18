import Vue from 'vue'
import VueRouter from 'vue-router'

// 懒加载
// const Home = () => import()

// 1.安装插件
Vue.use(VueRouter)

// 2.创建路由对象
const routes = [
    {
        path: '',
        redirect: '/home'
    },
    {
        path: '',
        compontnt: Home
    }
]
const router = new VueRouter({
    routes,
    // 设置为html的history模式
    mode: 'history'
})

// 3.导出
export default router

