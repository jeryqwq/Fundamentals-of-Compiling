const tokenType = require("./tokenType")
const AlphabetHelper = require("./AlphabetHelper")
const LexicalException = require("./LexicalException")
const Keywords = new Set([
  "var",
  "if",
  "while",
  "else",
  "break",
  "func",
  "return",
  "let",
  "const",
  "eval",
  "for",
  "int",
  "string",
])
const Types = new Set(["int", "string", "float"])
class Token {
  constructor(type, val) {
    this._type = type
    this._val = val
  }
  getType() {
    return this._type
  }
  isType() {
    return Types.has(this._val)
  }
  getVal() {
    return this._val
  }
  isVariable() {
    return this._type === tokenType.VARIABLE.type
  }
  isScalar() {
    return (
      this._type === tokenType.INTERGER ||
      this._type === tokenType.FLOAT ||
      this._type === tokenType.BOOLEAN
    )
  }
  toString() {
    return `type ${this._type} value ${this._val}`
  }
  static makeNumber(it) {
    let s = "",
      state = 0,
      lookHead
    while (it.hasNext()) {
      lookHead = it.peek()
      switch (state) {
        case 0:
          if (lookHead === "0") {
            state = 1
          } else if (AlphabetHelper.isNumber(lookHead)) {
            state = 2
          } else if (lookHead === "+" || lookHead === "-") {
            state = 3
          } else if (lookHead === ".") {
            state = 4
          }
          break
        case 1:
          if (lookHead === "0") {
            state = 1
          } else if (lookHead === ".") {
            state = 5 //累计浮点数
          } else {
            return new Token(tokenType.INTEGER.type, s)
          }
          break
        case 2:
          if (lookHead === ".") {
            state = 5
          } else if (AlphabetHelper.isNumber(lookHead)) {
            state = 2
          } else {
            return new Token(tokenType.INTEGER.type, s)
          }
          break
        case 3:
          if (AlphabetHelper.isNumber(lookHead)) {
            state = 2
          } else if (lookHead === ".") {
            state = 5
          } else {
            return new Token(tokenType.INTEGER.type, s)
          }
          break
        case 4:
          if (lookHead === ".") {
            throw new LexicalException(lookHead)
          } else if (AlphabetHelper.isNumber(lookHead)) {
            state = 2
          } else {
            return new Token(tokenType.FLOAT.type, s)
          }
          break
        case 5:
          if (AlphabetHelper.isNumber(lookHead)) {
            state = 5
          } else {
            return new Token(tokenType.FLOAT.type, s)
          }
      }

      s += lookHead
      it.next()
    }
  }
  static makeOp(it) {
    let s = "",
      state = 0,
      lookHead
    while (it.hasNext()) {
      lookHead = it.next()

      switch (state) {
        case 0:
          switch (lookHead) {
            case "+":
              state = 1
              break
            case "-":
              state = 2
              break
            case "*":
              state = 3
              break
            case "/":
              state = 4
              break
            case "%":
              state = 5
              break
            case ">":
              state = 6
              break
            case "<":
              state = 7
              break
            case "!":
              state = 8
              break
            case "^":
              state = 9
              break
            case "=":
              state = 10
              break
            case ",":
              return new Token(tokenType.OPERATOR.type, ",")
              break
            case ";":
              return new Token(tokenType.OPERATOR.type, ";")
              break
          }
          break
        case 1:
          if (lookHead === "+") {
            return new Token(tokenType.OPERATOR.type, "++")
          } else if (lookHead === "=") {
            return new Token(tokenType.OPERATOR.type, "+=")
          } else {
            it.putBack()
            return new Token(tokenType.OPERATOR.type, "+")
          }
          break
        case 2:
          if (lookHead === "-") {
            return new Token(tokenType.OPERATOR.type, "--")
          } else if (lookHead === "=") {
            return new Token(tokenType.OPERATOR.type, "-=")
          } else {
            it.putBack()
            return new Token(tokenType.OPERATOR.type, "-")
          }
          break
        case 3:
          if (lookHead === "=") {
            return new Token(tokenType.OPERATOR.type, "*=")
          } else {
            it.putBack()
            return new Token(tokenType.OPERATOR.type, "*")
          }
          break
        case 4:
          if (lookHead === "=") {
            return new Token(tokenType.OPERATOR.type, "/=")
          } else {
            it.putBack()
            return new Token(tokenType.OPERATOR.type, "/")
          }
          break
        case 5:
          if (lookHead === "=") {
            return new Token(tokenType.OPERATOR.type, "%=")
          } else {
            it.putBack()
            return new Token(tokenType.OPERATOR.type, "%")
          }
          break
        case 6:
          if (lookHead === "=") {
            return new Token(tokenType.OPERATOR.type, ">=")
          } else {
            it.putBack()
            return new Token(tokenType.OPERATOR.type, ">")
          }
          break
        case 7:
          if (lookHead === "=") {
            return new Token(tokenType.OPERATOR.type, "<=")
          } else {
            it.putBack()
            return new Token(tokenType.OPERATOR.type, "<")
          }
          break
        case 8:
          if (lookHead === "=") {
            return new Token(tokenType.OPERATOR.type, "!=")
          } else {
            it.putBack()
            return new Token(tokenType.OPERATOR.type, "!")
          }
          break
        case 9:
          if (lookHead === "=") {
            return new Token(tokenType.OPERATOR.type, "^=")
          } else {
            it.putBack()
            return new Token(tokenType.OPERATOR.type, "^")
          }
          break
        case 10:
          if (lookHead === "=") {
            return new Token(tokenType.OPERATOR.type, "==")
          } else {
            it.putBack()
            return new Token(tokenType.OPERATOR.type, "=")
          }
          break
      }
    }
  }
  static makeString(it) {
    let s = "",
      state = 0
    while (it.hasNext()) {
      const c = it.next()
      switch (state) {
        case 0:
          if (c === "'") {
            s += "'"
            state = 1
          }
          if (c === '"') {
            s += '"'
            state = 2
          }
          break
        case 1:
          if (c === "'") {
            return new Token(tokenType.STRING.type, s + c)
          } else {
            s += c
          }
          break
        case 2:
          if (c === '"') {
            return new Token(tokenType.STRING.type, s + c)
          } else {
            s += c
          }
          break
      }
    }
    throw new LexicalException("Exception Error")
  }
  static makeVarOrKeyword(it) {
    let s = ""
    while (it.hasNext()) {
      const c = it.peek()
      if (AlphabetHelper.isLiteral(c)) {
        s += c
      } else {
        break
      }
      it.next()
    }
    if (Keywords.has(s)) {
      return new Token(tokenType.KEYWORD.type, s)
    }
    if (s === "true" || s === "false") {
      return new Token(tokenType.BOOLEAN.type, s)
    }
    return new Token(tokenType.VARIABLE.type, s)
  }
}
module.exports = Token
