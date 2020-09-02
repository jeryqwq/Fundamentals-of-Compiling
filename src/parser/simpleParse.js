const Scalar = require("./ast/Scalar")
const Expr = require("./ast/Expr")
const ASTNodeTypes = require("./ast/ASTNodeTypes")
class SimpleParse {
  //parse number 1+2+3+4 ...+9
  //expr => digit + expr
  static parse(it) {
    const expr = new Expr(null)
    const scalar = new Scalar(expr, it)
    if (!it.hasNext()) {
      return scalar
    }
    expr.addChild(scalar)
    const op = it.nextMatch(it.peek())
    expr.label = "+"
    expr.type = ASTNodeTypes.BINARY_EXPR
    expr.lexeme = op
    expr.addChild(this.parse(it))
    return expr
  }
}
module.exports = SimpleParse
