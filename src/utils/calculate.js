class Calculate {
  /*
    * [calculateCount] 计算注数
   */
  calculateCount (active, play_name) {
    let count = 0
    const exist = this.play_name.has(play_name)
    const arr = new Array(active).fill(0)
    if (exist && play_name.at(0) === 'r') {
      count = Calculate.combine(arr, play_name.split('')[1])
    }
    return count
  }
  // 计算金额 （用户要支付给系统的钱）
  computeBonus (active, play_name) {

  }
  static combine(arr, size) {
    let allResult = []
    // eslint-disable-next-line no-shadow,no-unexpected-multiline
    (function f(arr, size, result) {

      let arrLen = arr.length
      if (size > arrLen) {
        return
      }
      if (size === arrLen) {
        allResult.push([].concat(result, arr))
      } else {
        for (let i = 0; i < arrLen; i++) {
          let newResult = [].concat(result)
          newResult.push(arr[i])
          if (size === 1) {
            allResult.push(newResult)
          } else {
            let newArr = [].concat(arr)
            newArr.splice(0, i + 1)
            f(newArr, size - 1, newResult)
          }
        }
      }
    })(arr, size, [])
  }
}
export default Calculate