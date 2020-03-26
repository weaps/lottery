/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable no-debugger */
export default {
  getYearMonthDay(date = new Date()) {
    return {
      year: date.getFullYear(),
      month: date.getMonth(),
      day: date.getDate()
    }
  },
  getDate(y, m, d = 1) {
    // debugger
    return new Date(y, m, d)
  }
}