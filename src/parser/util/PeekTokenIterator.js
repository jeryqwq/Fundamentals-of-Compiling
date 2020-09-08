const PeekIterator = require("./../../common/peekIterator")
const tokenType = require("../../lexer/tokenType")
const ParseException = require("./Exception")
module.exports = class PeekTokenIterator extends PeekIterator {
  constructor(it) {
    super(it)
  }
  nextMatch(val) {
    const token = this.next()
    if (token.getVal() !== val) {
      throw ParseException.fromToken(token.getVal())
    }
    return token
  }
  nextMatchType(val) {
    const token = this.it.next()
    if (token.getType() !== val) {
      throw ParseException.fromToken(c)
    }
    return token
  }
}
