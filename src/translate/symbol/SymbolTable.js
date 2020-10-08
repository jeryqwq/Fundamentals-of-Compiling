const Symbol = require("./Symbol")
const SymbolTypes = require("./SymbolTypes")
const TokenType = require("./../../lexer/TokenType")
const Token = require("./../../lexer/Token")
module.exports = class SymbolTable {
  constructor() {
    this.parent = null
    this.symbols = []
    this.children = []
    this.tempIndex = 0
    this.offsetIndex = 0
    this.level = 0
  }
  addSymbol(s) {
    this.symbols.push(s)
    s.parent = this
  }
  addChild(c) {
    c.parent = this
    c.level = this.level + 1
    this.children.push(c)
  }
  createLabel(label, lexem) {
    const s = Symbol.createLabelSymbol(label, lexem)
    this.addSymbol(s)
  }
  createVariable() {
    const lexem = new Token(TokenType.VARIABLE, "p" + this.tempIndex++)
    const s = Symbol.createAddressSymbol(lexem, this.offsetIndex++)
    this.addSymbol(s)
    return s
  }
  exsits(lexem) {
    const item = this.symbols.find(
      (item) => item.lexem.getValue() === lexem.getValue()
    )
    if (item) return true
    if (this.parent) {
      return this.exsits(lexem)
    }
    return false
  }
  cloneFromSymbolTree(lexem, offsetLayout) {
    const item = this.symbols.find((item) => {
      return item.lexem.getVal() === lexem.getVal()
    })
    if (item) {
      const s = Symbol.copy(item)
      s.layoutOffset = offsetLayout
      return s
    }
    if (this.parent) {
      return this.parent.cloneFromSymbolTree(symbol, offsetLayout + 1)
    }
  }
  createSymbolByLexeme(lexeme) {
    let symbol = null
    if (lexeme.isScalar()) {
      symbol = Symbol.createImmediateSymbol(lexeme)
    } else {
      symbol = this.cloneFromSymbolTree(lexeme, 0)
      if (!symbol) {
        symbol = Symbol.createAddressSymbol(lexeme, this.offsetIndex++)
      }
    }
    this.addSymbol(symbol)
    return symbol
  }
  localSize() {
    return this.offsetIndex
  }
}
