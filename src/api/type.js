import request from '@/api/axios'

export const getRequest = (url, params) => {
  return new Promise((resolve, reject) => {
    request.get(url, {params})
      .then(res => resolve(res))
      .catch(err => reject(err))
  })
}