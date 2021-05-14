import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import { store } from '@/store'
import '@/assets/css/reset.css'

Vue.config.productionTip = false

// 将cancelAxios挂载到vue原型上
Vue.prototype.cancelAxios = function(){
  let cancelArr = window.axiosCancel || []    // 获取缓存的 请求取消标识 数组，取消所有关联的请求
  cancelArr.forEach(item => {
    item.cancel("主动取消请求")   // 在失败函数中返回这里自定义的错误信息
  })
  window.axiosCancel = []   // 清空全局定义一个存放取消请求的标识
}

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
