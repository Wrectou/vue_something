import request from '@/api/axios'

// get请求
export const getRequest = (url, params) => {
  return new Promise((resolve, reject) => {
    request.get(url, params)
      .then(res => resolve(res))
      .catch(err => reject(err))
  })
}

// put请求
export const putRequest = (url, params) => {
  return new Promise((resolve, reject) => {
    request.put(url, params)
      .then(res => resolve(res))
      .catch(err => reject(err))
  })
}

// delete请求
export const deleteRequest = (url, params) => {
  return new Promise((resolve, reject) => {
    request.delete(url, params)
      .then(res => resolve(res))
      .catch(err => reject(err))
  })
}