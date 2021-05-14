import axios from 'axios'
import { Toast } from 'vant'

// 全局定义一个存放取消请求的标识
window.axiosCancel = []

// axios实例
const request = axios.create({
  baseURL: process.env.VUE_APP_API,
  // baseURL: 'https://todo-add9b-default-rtdb.firebaseio.com',
  // baseURL: 'https://t9b-default-rtdb.firebaseio.com',
  // baseURL: 'https://my-blog-3a640.firebaseio.com',
  timeout: 10 * 1000,
})

// 三秒钟后有如果还没获得返回值网络请求提示
let timer

// 请求拦截
request.interceptors.request.use(function (config) {
  clearTimeout(timer)
  timer = setTimeout(() => { Toast.loading({message: '',duration: 15000}) }, 3000)
  // 添加需要取消的请求标记
  config.cancelToken = new axios.CancelToken(cancel => window.axiosCancel.push({cancel}))
  return config
}, function (error) {
  return Promise.reject(error)
});

// 响应拦截
request.interceptors.response.use(function (response) {
  Toast.clear()
  clearTimeout(timer)
  return response
}, function (error) {
  Toast.clear()
  clearTimeout(timer)
  let errStr = error.toString()
  let errCode = Number(errStr.substring(errStr.length-3))
  // 由于主动取消请求的状态status和请求失败一样是 (canceled) ，所以要对此做特殊判断
  if (error.message === '主动取消请求') return {}
  else if (error) {
    switch (errCode) {
      case 400:
        error.message = '错误请求'
        break;
      case 401:
        error.message = '未授权，请重新登录'
        break;
      case 403:
        error.message = '拒绝访问'
        break;
      case 404:
        error.message = '请求错误,未找到该资源'
        break;
      case 405:
        error.message = '请求方法未允许'
        break;
      case 500:
        error.message = '服务器端出错'
        break;
      default:
        error.message = '连接失败' 
    }
  } else {
    err.message = "连接到服务器失败"
  }
  Toast(`请求出错：${error.message}`)
  return Promise.reject(error)
});

export default request