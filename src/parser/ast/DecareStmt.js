const ASTNode = require("./ASTNode")
const Stmt = require("./Stmt")
const ASTNodeTypes = require("./ASTNodeTypes")
class DecalreStmt extends Stmt {
  constructor(parent, type, label) {
    super(parent, ASTNodeTypes.DECLARE_STMT, "decalre")
  }
}

module.exports = DecalreStmt
const { Factor, Scalar } = require("./index")
const { Expr } = require("./index")

DecalreStmt.parse = (it) => {
  it.nextMatch("let")
  const tk = it.peek()
  const stmt = new DecalreStmt()
  const factor = new Factor(null, it)
  if (!factor) {
    throw Exception.fromToken(tk)
  }
  stmt.addChild(factor)
  const lexeme = it.nextMatch("=")
  const expr = Expr.parseExpr(null, it)
  stmt.addChild(expr)
  stmt.setLexeme(lexeme)
  return stmt
}
