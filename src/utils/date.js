export const date = {
  format (date) {
    return this.formatWithPatternDate('yyyy-mm-dd', date)
  },
  formatWithPatternDate (format, date) {
    if (!date) { return null}
    var look = function (m) { // Check whether a format character is doubled
        var n = 0
        while (i + 1 < format.length && format.charAt(i + 1) === m) {
          n++
          i++
        }
        return n
      },
      f1 = function (m, val, len) { // Format a number, with leading zero if necessary
        var n = '' + val
        if (look(m)) {
          while (n.length < len) {
            n = '0' + n
          }
        }
        return n
      },
      i,
      output = '',
      literal = false

    for (i = 0; i < format.length; i++) {
      if (literal) {
        if (format.charAt(i) === "'" && !look("'")) {
          literal = false
        } else {
          output += format.charAt(i)
        }
      } else {
        switch (format.charAt(i)) {
          case 'd':
            output += f1('d', date.getDate(), 2)
            break
          case 'o':
            output += f1('o', (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000, 3)
            break
          case 'm':
            output += f1('m', date.getMonth() + 1, 2)
            break
          case 'y':
            output += (look('y') ? date.getFullYear() : (date.getFullYear() % 100 < 10 ? '0' : '') + date.getFullYear() % 100)
            break
          case 'h':
            var h = date.getHours()
            output += f1('h', (h > 12 ? (h - 12) : (h === 0 ? 12 : h)), 2)
            break
          case 'H':
            output += f1('H', date.getHours(), 2)
            break
          case 'i':
            output += f1('i', date.getMinutes(), 2)
            break
          case 's':
            output += f1('s', date.getSeconds(), 2)
            break
          case 'a':
            output += date.getHours() > 11 ? '下午' : '上午'
            break
          case 'A':
            output += date.getHours() > 11 ? 'PM' : 'AM'
            break
          case "'":
            if (look("'")) {
              output += "'"
            } else {
              literal = true
            }
            break
          default:
            output += format.charAt(i)
        }
      }
    }
    return output
  },
  getWeek (dateString) {
    let date
    let dateArray = dateString.split('-')
    date = new Date(dateArray[0], Number(dateArray[1]) - 1, dateArray[2])
    return '星期' + '日一二三四五六'.charAt(date.getDay())
  },
  compare (d1, d2) {
    d1 = d1.replace(/\-/gi, '/')
    d2 = d2.replace(/\-/gi, '/')
    let time1 = new Date(d1).getTime()
    let time2 = new Date(d2).getTime()
    if (time1 > time2) {
      return 1
    } else if (time1 == time2) {
      return 0
    } else {
      return -1
    }
  },
  getPreMonth (date) {
    let arr = date.split('-')
    let year = arr[0] // 获取当前日期的年份
    let month = arr[1] // 获取当前日期的月份
    let year2 = year
    let month2 = parseInt(month) - 1
    if (month2 == 0) {
      year2 = parseInt(year2) - 1
      month2 = 12
    }
    let month2Str = month2.toString()
    if (month2 < 10) {
      month2Str = '0' + month2
    }
    let t2 = year2 + '-' + month2Str
    return t2
  },
  getNextMonth (date) {
    let arr = date.split('-')
    let year = arr[0] // 获取当前日期的年份
    let month = arr[1] // 获取当前日期的月份
    let year2 = year
    let month2 = parseInt(month) + 1
    if (month2 == 13) {
      year2 = parseInt(year2) + 1
      month2 = 1
    }
    let month2Str = month2.toString()
    if (month2 < 10) {
      month2Str = '0' + month2
    }

    let t2 = year2 + '-' + month2Str
    return t2
  },
  // 获取前后a天的日期
  funDate (day) {
    let date1 = new Date()
    let date2 = new Date(date1)
    date2.setDate(date1.getDate() + day)
    return date2
  },
  // 获取当前年龄
  //传入格式化的出生年月日 如：1990-01-01
  getCurrentAge (start, end = this.format(new Date())) {
    start = start.split("-");
    end = end.split("-");
    let temp = (end[0] - start[0]) * 12 + (end[1] - start[1]) + (end[2] - start[2] >= 0 ? 0 : -1);
    if (temp < 12) {
      return temp + '个月'
    } else {
      return parseInt(temp / 12) + '岁'
    }
  }
}
