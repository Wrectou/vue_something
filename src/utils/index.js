// 封装存localStorage方法
export const setLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data))
}

// 封装取localStorage方法
export const getLocalStorage = (key) => {
  const data = localStorage.getItem(key)
  if (data) return JSON.parse(data)
}

// 封装存sessionStorage方法
export const setSessionStorage = (key, data) => {
  sessionStorage.setItem(key, JSON.stringify(data))
}

// 封装取sessionStorage方法
export const getSessionStorage = (key) => {
  const data = sessionStorage.getItem(key)
  if (data) return JSON.parse(data)
}

// 时间工具
export class TimeUtil {
  /**
   * 返回指定时间戳的年月日字符串   返回值为 xxxx-xx-xx
   * @param {Number} time 时间戳
   */
  getYearMonthDayStr(time) {
    const timeStamp = Number(time)
    const today = new Date(timeStamp)
    const year = today.getFullYear()
    const month = today.getMonth()+1 < 10 ? '0'+(today.getMonth()+1) : today.getMonth()+1
    const day = today.getDate() < 10 ? '0'+today.getDate() : today.getDate()
    return year+'-'+month+'-'+day
  }

  /**
   * 判断是否为今天？   返回值为 true 或 false  (借用了getYearMonthDayStr方法)
   * @param {Number} time 时间戳
   */
  isToday(time){
    const timeStamp = Number(time)
    const today = new Date()
    const timeStr = this.getYearMonthDayStr(today)
    const todayStartStr = `${timeStr} 00:00:00`
    const todayEndStr = `${timeStr} 23:59:59`
    const startTimeStamp = new Date(todayStartStr).getTime()
    const endTimeStamp = new Date(todayEndStr).getTime()
    if (timeStamp >= startTimeStamp && timeStamp <= endTimeStamp) return true
    else return false
  }

  /**
   * 判断是否为本周？   返回值为 true 或 false  (借用了getYearMonthDayStr方法)
   * @param {Number} time 时间戳
   */
  isThisWeek(time) {
    const timeStamp = Number(time)
    const now = new Date()
    const week = new Date().getDay()
    const millisecond = 1000 * 60 * 60 * 24
    const minusDay = week != 0 ? week - 1 : 6
    const monday = new Date(now.getTime() - (minusDay * millisecond))
    const sunday = new Date(monday.getTime() + (6 * millisecond))
    const mondayStr = this.getYearMonthDayStr(monday.getTime()) + ' 00:00:00'
    const sundayStr = this.getYearMonthDayStr(sunday.getTime()) + ' 23:59:59'
    const startTimeStamp = new Date(mondayStr).getTime()
    const endTimeStamp = new Date(sundayStr).getTime()
    if (timeStamp >= startTimeStamp && timeStamp <= endTimeStamp) return true
    else return false
  }

  /**
   * 判断是否为今年？   返回值为 true 或 false
   * @param {Number} time 时间戳
   */
  isThisYear(time) {
    const timeStamp = Number(time)
    const today = new Date()
    const year = today.getFullYear()
    const yearStartStr = year + '-01-01 00:00:00'
    const yearEndStr = year + '-12-31 23:59:59'
    const startTimeStamp = new Date(yearStartStr).getTime()
    const endTimeStamp = new Date(yearEndStr).getTime()
    if (timeStamp >= startTimeStamp && timeStamp <= endTimeStamp) return true
    else return false
  }

  /**
   * 时间格式化
   * 今天  ->  今天 xx:xx
   * 本周  ->  周x xx:xx
   * 今年  ->  x月x日 xx:xx
   * 今其他年份  ->  x年x月x日
   * @param {Number} time 
   * @returns 
   */
  formatTime(time) {
    const timeStamp = Number(time)
    const weekDay = new Date(timeStamp).getDay()
    const today = new Date(timeStamp)
    const year = today.getFullYear()
    const month = today.getMonth()+1
    const day = today.getDate()
    const hour = new Date(timeStamp).getHours() < 10 ? '0'+new Date(timeStamp).getHours() : new Date(timeStamp).getHours()
    const minutes = new Date(timeStamp).getMinutes() < 10 ? '0'+new Date(timeStamp).getMinutes() : new Date(timeStamp).getMinutes()
    if (this.isToday(time)) {
      return `今天 ${hour}:${minutes}`
    } else if (this.isThisWeek(time)) {
      const weekObj = {0: '日', 1: '一', 2: '二', 3: '三', 4: '四', 5: '五', 6: '六',}
      return `周${weekObj[weekDay]} ${hour}:${minutes}`
    } else if (this.isThisYear(time)){
      return `${month}月${day}日 ${hour}:${minutes}`
    } else {
      return `${year}年${month}月${day}日`
    }
  }

}

/**
 * 时间格式化
 * 今天  ->  今天 xx:xx
 * 本周  ->  周x xx:xx
 * 今年  ->  x月x日 xx:xx
 * 今其他年份  ->  x年x月x日
 * @param {Number} time 
 * @returns 
 */
export const formatTime = (time) => {
  const timeStamp = Number(time)
  const weekDay = new Date(timeStamp).getDay()
  const today = new Date(timeStamp)
  const year = today.getFullYear()
  const month = today.getMonth()+1
  const day = today.getDate()
  const hour = new Date(timeStamp).getHours() < 10 ? '0'+new Date(timeStamp).getHours() : new Date(timeStamp).getHours()
  const minutes = new Date(timeStamp).getMinutes() < 10 ? '0'+new Date(timeStamp).getMinutes() : new Date(timeStamp).getMinutes()
  if (isToday(time)) {
    return `今天 ${hour}:${minutes}`
  } else if (isWeek(time)) {
    const weekObj = {0: '日', 1: '一', 2: '二', 3: '三', 4: '四', 5: '五', 6: '六',}
    return `周${weekObj[weekDay]} ${hour}:${minutes}`
  } else if (isYear(time)){
    return `${month}月${day}日 ${hour}:${minutes}`
  } else {
    return `${year}年${month}月${day}日`
  }
}

/**
 * 判断是否为今天？   返回值为 true 或 false  (借用了getYearMonthDayStr方法)
 * @param {Number} time 时间戳
 */
export const isToday = (time) => {
  const timeStamp = Number(time)
  const today = new Date()
  const timeStr = getYearMonthDayStr(today)
  const todayStartStr = `${timeStr} 00:00:00`
  const todayEndStr = `${timeStr} 23:59:59`
  const startTimeStamp = new Date(todayStartStr).getTime()
  const endTimeStamp = new Date(todayEndStr).getTime()
  if (timeStamp >= startTimeStamp && timeStamp <= endTimeStamp) return true
  else return false
}

/**
 * 判断是否为本周？   返回值为 true 或 false  (借用了getYearMonthDayStr方法)
 * @param {Number} time 时间戳
 */
export const isWeek = (time) => {
  const timeStamp = Number(time)
  const now = new Date()
  const week = new Date().getDay()
  const millisecond = 1000 * 60 * 60 * 24
  const minusDay = week != 0 ? week - 1 : 6
  const monday = new Date(now.getTime() - (minusDay * millisecond))
  const sunday = new Date(monday.getTime() + (6 * millisecond))
  const mondayStr = getYearMonthDayStr(monday.getTime()) + ' 00:00:00'
  const sundayStr = getYearMonthDayStr(sunday.getTime()) + ' 23:59:59'
  const startTimeStamp = new Date(mondayStr).getTime()
  const endTimeStamp = new Date(sundayStr).getTime()
  if (timeStamp >= startTimeStamp && timeStamp <= endTimeStamp) return true
  else return false
}

/**
 * 判断是否为今年？   返回值为 true 或 false
 * @param {Number} time 时间戳
 */
export const isYear = (time) => {
  const timeStamp = Number(time)
  const today = new Date()
  const year = today.getFullYear()
  const yearStartStr = year + '-01-01 00:00:00'
  const yearEndStr = year + '-12-31 23:59:59'
  const startTimeStamp = new Date(yearStartStr).getTime()
  const endTimeStamp = new Date(yearEndStr).getTime()
  if (timeStamp >= startTimeStamp && timeStamp <= endTimeStamp) return true
  else return false
}

/**
 * 返回指定时间戳的年月日字符串   返回值为 xxxx-xx-xx
 * @param {Number} time 时间戳
 */
export const getYearMonthDayStr = (time) => {
  const timeStamp = Number(time)
  const today = new Date(timeStamp)
  const year = today.getFullYear()
  const month = today.getMonth()+1 < 10 ? '0'+(today.getMonth()+1) : today.getMonth()+1
  const day = today.getDate() < 10 ? '0'+today.getDate() : today.getDate()
  return year+'-'+month+'-'+day
}