/**
 *
 * By So http://sooo.site
 * -----
 *    Javascript will save your soul!
 * -----
 *
 */

export default {
  Datetime(format = 'Y-m-d h:i:s', time = '') {
    // 获取格式化时间
    const now = time ? new Date(time) : new Date()

    // 获取完整时间
    const getFull = (number, len = 2) => {
      return (Array(len).join('0') + number).substr(-len)
    }

    // 时间格式化对应表
    const fmt = {
      Y: now.getFullYear(),
      y: getFull(now.getFullYear()),
      M: getFull(now.getMonth() + 1),
      m: now.getMonth() + 1,
      D: getFull(now.getDate()),
      d: now.getDate(),
      w: now.getDay(),
      H: getFull(now.getHours()),
      h: now.getHours(),
      I: getFull(now.getMinutes()),
      i: now.getMinutes(),
      S: getFull(now.getSeconds()),
      s: now.getSeconds(),
      t: Number(now.getTime())
    }

    // 时间格式化
    for (const idx in fmt) {
      format = format.replace(new RegExp(idx, 'g'), fmt[idx])
    }
    return format
  },
  Timestamp(time = '') {
    return this.Datetime('t', time)
  },
  Date(time = '') {
    return this.Datetime('Y-m-d', time)
  },
  Time(time = '') {
    return this.Datetime('h-i-s', time)
  },
  GetKey(args) {
    const key = window.btoa(args)
    return key
  },
  GetGetForm(name) {
    const reg = new RegExp(`(^|&)${name}=(\\S+?)(&|$)`, 'g')
    const result = reg.exec(window.location.search.substr(1))
    return !result || result.length < 3 ? '' : decodeURI(result[2])
  }
}
