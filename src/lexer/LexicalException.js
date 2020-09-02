class LexicalException extends Error {
  constructor(msg) {
    super()
    this.msg = msg
  }
  static fromChar(c) {
    return new SyntaxError(`unexpected char at ${c}`)
  }
}
module.exports = LexicalException
