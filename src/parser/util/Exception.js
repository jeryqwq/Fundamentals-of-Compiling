module.exports = class ParseException extends Error {
  constructor(msg) {
    super(msg)
  }
  static fromToken(token) {
    return new ParseException(`Syntax Error , unexpected token in ${token}`)
  }
}
