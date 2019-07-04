class Timer {
  countdown(end, update, handle) {
    const now = new Date().getTime()
    const that = this
    // 如果当前时间大于结束时间，那就说明计时器已经过期，返回一个回调函数
    if (now - end) {
      handle.call(this)
    } else {
      // 结束时间减去当前当前时间，就是剩余时间
      let last_time = end - now
      const px_d = 1000 * 60 * 60 * 24,
            px_h = 1000 * 60 * 60,
            px_m = 1000 * 60,
            px_s = 1000
      let d = Math.floor(last_time / px_d),
          h = Math.floor((last_time - d * px_d) / px_h),
          m = Math.floor((last_time - d * px_d - h * px_h) / px_m),
          s = Math.floor((last_time - d * px_d - h * px_h - m * px_m) / px_s),
          r = []

      if (d > 0) {
        r.push(`<em>${d}</em>天`)
      }
      if (r.length || h > 0) {
        r.push(`<em>${h}</em>时`)
      }
      if (r.length || m > 0) {
        r.push(`<em>${m}</em>分`)
      }
      if (r.length || s > 0) {
        r.push(`<em>${s}</em>秒`)
      }

      that.last_time = r.join('')
      update.call(that, r.join(''))
      setTimeout(() => {
        that.countdown(end, update, handle)
      }, 1000)
    }
  }
}

export default Timer
