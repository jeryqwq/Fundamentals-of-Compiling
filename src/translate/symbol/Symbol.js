const SymbolTypes = require("./SymbolTypes")
module.exports = class Symbol {
  constructor(type) {
    this.type = type
    this.label = null
    this.offset = 0 //偏移位
    this.layoutOffset = 0 //作用域偏移｜｜ 活动列表偏移
    this.lexem = null //词法
    this.parent = null
  }
  static createAddressSymbol(lexem, offset) {
    const s = new Symbol(SymbolTypes.ADDRESS_SYMBOL)
    s.lexem = lexem
    s.offset = offset
    return s
  }
  static createImmediateSymbol(lexem) {
    const s = new Symbol(SymbolTypes.IMMEDIATE_SYMBOL)
    s.lexem = lexem
    return s
  }
  static createLabelSymbol(label, lexem) {
    const s = new Symbol(SymbolTypes.LABEL_SYMBOL)
    s.label = label
    s.lexem = lexem
    return s
  }
  copy() {
    const s = new Symbol(this.type)
    s.label = this.label
    s.offset = this.offset
    s.layoutOffset = this.layoutOffset
    s.lexem = this.lexem
    s.parent = this.parent
    return s
  }
  toString() {
    return this.lexem.getValue()
  }
}
