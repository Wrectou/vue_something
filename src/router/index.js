import Vue from 'vue'
import VueRouter from 'vue-router'
import { routes } from '@/router/routes'

Vue.use(VueRouter)

//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  routes
})

/* 路由拦截器 路由跳转前的操作 */
router.beforeEach((to, from, next) => {
  let cancelArr = window.axiosCancel || []    // 获取缓存的 请求取消标识 数组，取消所有关联的请求
  cancelArr.forEach(item => {
    item.cancel("主动取消请求")   // 在失败函数中返回这里自定义的错误信息
  })
  window.axiosCancel = []   // 清空全局定义一个存放取消请求的标识
  next()
})

export default router