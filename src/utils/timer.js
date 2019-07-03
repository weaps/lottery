class Timer {
  countdown(end, update, handle) {
    const now = new Date().getTime()
    const that = this
    if(now - end) {
      handle.call(this)
    } else {
      let last_time = end - now
      const px_d = 1000 * 60 * 60 * 24,
            px_h = 1000 * 60 * 60,
            px_m = 1000 * 60,
            px_s = 1000
      let d = Math.floor(last_time / px_d),
          h = Math.floor(last_time / px_d / px_h);
    }
  }
}