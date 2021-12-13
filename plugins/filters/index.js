/**
 * 将小于10的数字前加0
 */
export function fillZero (n) {
  return n < 10 ? '0' + n : '' + n
}

/**
 * 时间格式化
 * type:1.xx年xx月xx日，2.xxxx-xx-xx xx:xx:xx,3.xxxx-xx-xx
 */
export function dateFormatting (time, type = 1) {
  if (!time) { return false }
  const d = new Date(time)
  d.getTime()
  const y = d.getFullYear()
  const m = d.getMonth() + 1
  const day = d.getDate()
  const h = d.getHours()
  const min = d.getMinutes()
  const sec = d.getSeconds()
  switch (type) {
    case 1:
      return `${y}年${fillZero(m)}月${fillZero(day)}日`
    case 2:
      return `${y}-${fillZero(m)}-${fillZero(day)} ${fillZero(h)}:${fillZero(min)}:${fillZero(sec)}`
    case 3:
      return `${y}-${fillZero(m)}-${fillZero(day)}`
  }
}
