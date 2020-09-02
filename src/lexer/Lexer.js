const Token = require("./Token")
const PeekIterator = require("./../common/peekIterator")
const tokenType = require("./tokenType")
const AlphabetHelper = require("./AlphabetHelper")
const LexicalException = require("./LexicalException")
class Lexer {
  constructor() {
    this.tokens = []
  }
  analyse(source) {
    const it = new PeekIterator(source, "/0")
    while (it.hasNext()) {
      let c = it.next()
      if (c === "/0") break
      if (c === " " || c === "/n") {
        continue
      }
      if (c === "/") {
        //处理注释
        const lookHead = it.peek()
        if (lookHead === "/") {
          while (it.hasNext() && (c = it.next()) != "\n") {}
        } else if (lookHead === "*") {
          let success = false
          while (it.hasNext()) {
            const p = it.next()
            if (p === "*" && it.peek() === "/") {
              it.next() == "/" && it.next()
              success = true
              break
            }
          }
          if (!success) {
            throw new LexicalException("comment no matched")
          }
        }
      }
      if (c === "{" || c === "}" || c === "(" || c === ")") {
        this.tokens.push(new Token(tokenType.BRACKET.type, c))
        continue
      }
      if (c === '"' || c === "'") {
        it.putBack() //需要加上'或者" 回退一次
        this.tokens.push(Token.makeString(it)) //生成字符串token
        continue
      }
      if (AlphabetHelper.isLetter(c)) {
        it.putBack() //需要加上'或者" 回退一次
        this.tokens.push(Token.makeVarOrKeyword(it)) //生成字符串token
        continue
      }
      if (AlphabetHelper.isNumber(c)) {
        it.putBack() //需要加上'或者" 回退一次
        this.tokens.push(Token.makeNumber(it)) //生成字符串token
        continue
      }
      if ((c === "+" || c === "-") && AlphabetHelper.isNumber(it.peek())) {
        //当前为操作符，下一个是数字
        //数字的+=
        const last = this.tokens[this.tokens.length - 1] || null
        if (last == null && !last.isValue()) {
          //能直接参与计算的表达式  +5  || 6*5
          it.putBack()
          this.tokens.push(Token.makeNumber(it))
          continue
        }
      }
      if (AlphabetHelper.isOperator(c)) {
        it.putBack()
        this.tokens.push(Token.makeOp(it))
        continue
      }
      LexicalException.fromChar(c)
    }
    return this.tokens
  }
}
module.exports = Lexer
