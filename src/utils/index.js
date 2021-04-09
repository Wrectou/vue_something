export const setLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data))
}

export const getLocalStorage = (key) => {
  const data = localStorage.getItem(key)
  if (data) return JSON.parse(data)
}

export const setSessionStorage = (key, data) => {
  sessionStorage.setItem(key, JSON.stringify(data))
}

export const getSessionStorage = (key) => {
  const data = sessionStorage.getItem(key)
  if (data) return JSON.parse(data)
}

export const formatTime = (time) => {

  const minute = 1000 * 60
  const hour = minute * 60
  const day = hour * 24
  const week = day * 7
  const month = day * 30
  const year = month * 12

  const nowTime = new Date()
  const nowTimeString = nowTime.getTime()
  const oldTime = new Date(time)
  const oldTimeString = new Date(time).getTime()
  const diffTimeString = nowTimeString - oldTimeString

  const ruleYearString = new Date(nowTime.getFullYear() + '-01-01 00:00:00').getTime()
  const yestdayTime = nowTime.getFullYear() + '-' + (nowTime.getMonth()+1) + '-' + nowTime.getDate()
  const ruleThisYearString = (new Date(yestdayTime).getTime()) - day
  const ruleYestdayString = (new Date(yestdayTime).getTime())

  if (ruleYearString > oldTimeString) {
    const year = oldTime.getFullYear()
    const month = oldTime.getMonth() + 1
    const day = oldTime.getDate()
    return year + '年' + month + '月' + day + '日'
  } else if (ruleThisYearString > oldTimeString) {
    const month = oldTime.getMonth() + 1
    const day = oldTime.getDate()
    return month + '月' + day + '日'
  } else if (ruleYestdayString > oldTimeString) {
    return '昨天'
  } else if (ruleYestdayString <= oldTimeString && diffTimeString / hour > 1) {
    return Math.floor(diffTimeString / hour) + '小时前'
  } else if (diffTimeString / minute > 0) {
    return Math.floor(diffTimeString / minute) + '分钟前'
  } else {
    return '时间不正确，大于当前时间'
  }
}