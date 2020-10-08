const ASTNode = require("./ASTNode")
const Stmt = require("./Stmt")
const ASTNodeTypes = require("./ASTNodeTypes")
class ReturnStmt extends Stmt {
  constructor(parent) {
    super(parent, ASTNodeTypes.FUNCTION_ARGS, "ReturnStmt")
  }
}
module.exports = ReturnStmt
const { Factor, Expr } = require("./index")

ReturnStmt.parse = (it) => {
  const lexeme = it.nextMatch("return")
  const expr = Expr.parseExpr(null, it)
  const stmt = new ReturnStmt()
  stmt.setLexeme(lexeme)
  stmt.addChild(expr)
  return stmt
}
