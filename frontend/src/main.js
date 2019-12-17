import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import './theme/element/index.css'
import router from './router'
import store from './store'


Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');


// 设置浏览器标题
Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = el.dataset.title
  }
});
