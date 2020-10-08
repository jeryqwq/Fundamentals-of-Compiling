class ASTNode {
  constructor(parent, type, label) {
    this._parent = parent
    this.children = []
    this.lexeme = null
    this._type = type
    this.label = label
  }
  getChildren() {
    return this.children
  }
  getChild(idx) {
    return this.children[idx]
  }
  addChild(item) {
    this.children.push(item)
  }
  setLexeme(lexeme) {
    this.lexeme = lexeme
  }
  getLexeme() {
    return this.lexeme
  }
  print(indent = 1) {
    console.log(`${"".padStart(indent * 2, " ")}----${this.label}`)

    this.children.forEach((x) => x.print(indent + 1))
  }
}
module.exports = ASTNode
