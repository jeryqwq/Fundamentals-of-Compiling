const LinkedList = require("linkedlist")
const CACHE_SIZE = 10
class PeekIterator {
  constructor(it, endToken) {
    this.it = it
    this.stackPutBack = new LinkedList()
    this.queueCache = new LinkedList() //时间窗口 存储10个
    this.endToken = endToken
  }

  hasNext() {
    return this.endToken || Boolean(this.peek())
  }
  peek() {
    if (this.stackPutBack.length > 0) {
      return this.stackPutBack.tail
    }
    const val = this.it.next && this.it.next().value
    if (val) {
      this.queueCache.push(val)
      this.putBack()
      return val
    }
    return null
  }

  putBack() {
    if (this.queueCache.length > 0) {
      const a = this.queueCache.pop()
      this.stackPutBack.push(a)
    }
  }
  next() {
    let val
    if (this.stackPutBack.length > 0) {
      //优先从栈中读取
      val = this.stackPutBack.pop()
    } else {
      val = this.it.next().value //没有则从迭代器中读取
      const temp = this.endToken
      this.endToken = null
      if (!val) return temp
    }
    while (this.queueCache.length > CACHE_SIZE - 1) {
      this.queueCache.shift()
    }
    this.queueCache.push(val)
    return val
  }
}
module.exports = PeekIterator
