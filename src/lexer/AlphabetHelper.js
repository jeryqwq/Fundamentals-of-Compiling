class AlphabetHelper {
  static ptnLetter = /^[a-zA-Z]$/
  static ptnNumber = /^[0-9]$/
  static ptnLiteral = /^[_a-zA-Z0-9]$/
  static ptnOperator = /^[+-\\*/><=!&|^%]$/
  static isLetter(s) {
    return this.ptnLetter.test(s)
  }
  static isNumber(s) {
    return this.ptnNumber.test(s)
  }
  static isLiteral(s) {
    return this.ptnLiteral.test(s)
  }
  static isOperator(s) {
    return new RegExp(this.ptnOperator).test(s)
  }
}

module.exports = AlphabetHelper
