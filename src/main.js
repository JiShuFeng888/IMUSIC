import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import './assets/css/base.scss'
import VueLazyload from 'vue-lazyload'
import Loading from './plugin/loading/index'

import MetaInfo from 'vue-meta-info'
 
Vue.use(MetaInfo);
Vue.use(Loading, {
  title:'正在努力加载中...'
  
})
Vue.use(VueLazyload, {
  preLoad: 1.3,
  // error: 'dist/error.png',
  //占位图片
  loading: require("./assets/images/loading.png"),
  attempt: 1
})

fastclick.attach(document.body)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  mounted: () => document.dispatchEvent(new Event("x-app-rendered")),
}).$mount('#app')
