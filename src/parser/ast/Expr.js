const ASTNode = require("./ASTNode")
const ASTNodeTypes = require("./ASTNodeTypes")
const table = require("./../util/PriorityTable")
const Variable = require("./../ast/Variable")
const Scalar = require("./Scalar")
module.exports = class Expr extends ASTNode {
  constructor(parent, type, label) {
    super(parent, type, label)
  }
  static parseExpr(parent, it) {
    const expr = this.E(parent, it, 0)
    return expr
  }
  static E(parent, it, k) {
    if (k < table.length - 1) {
      const expr = this.combin(
        parent,
        it,
        () => this.E(parent, it, k + 1),
        () => this.E_(parent, it, k)
      )
      return expr
    } else {
      const expr = this.race(
        it,

        () =>
          this.combin(
            parent,
            it,
            () => this.U(parent, it),
            () => this.E_(parent, it, k)
          ),
        () =>
          this.combin(
            parent,
            it,
            () => this.F(parent, it),
            () => this.E_(parent, it, k)
          )
      )
      return expr
    }
  }
  static E_(parent, it, k) {
    const token = it.peek()
    const value = token.getVal()
    if (table[k].indexOf(value) != -1) {
      it.nextMatch(value)
      const expr = this.fromToken(parent, ASTNodeTypes.BINARY_EXPR, token)
      const item = this.combin(
        parent,
        it,
        () => this.E(parent, it, k + 1),
        () => this.E_(parent, it, k)
      )
      expr.addChild(item)
      return expr
    }
    return null
  }
  static U(parent, it) {
    const token = it.peek()
    const val = token.getVal()
    if (val === "(") {
      it.nextMatch("(")
      const expr = this.parseExpr(parent, it)
      it.nextMatch(")")
      return expr
    } else if (val == "++" || val == "--" || val == "!") {
      const t = it.peek()
      it.nextMatch(val)
      const epxr = this.fromToken(parent, AstNodeTypes.UNARY_EXPR, t)
      epxr.addChild(this.parseExpr(parent, it))
      return epxr
    }
    return null
  }
  static F(parent, it) {
    const token = it.peek()
    if (token.isVariable()) {
      return new Variable(parent, it)
    } else {
      return new Scalar(parent, it)
    }
  }
  static fromToken(parent, type, token) {
    const expr = new Expr(parent)
    expr.label = token.getVal()
    expr.lexeme = token
    expr.type = type
    return expr
  }
  static combin(parent, it, fn1, fn2) {
    if (!it.hasNext()) return null
    const a = fn1()
    if (!a) {
      return it.hasNext() ? fn2() : null
    }
    const b = it.hasNext() ? fn2() : null
    if (!b) return a
    const expr = Expr.fromToken(parent, ASTNodeTypes.BINARY_EXPR, b.lexeme)
    expr.addChild(a)
    expr.addChild(b.getChild(0))
    return expr
  }
  static race(it, fn1, fn2) {
    if (!it.hasNext()) return null
    const a = fn1()
    if (a) {
      return a
    }
    const b = fn2()

    return b
  }
}
