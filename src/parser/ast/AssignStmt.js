const ASTNode = require("./ASTNode")
const Stmt = require("./Stmt")
const ASTNodeTypes = require("./ASTNodeTypes")
const Exception = require("./../util/Exception")
class AssignStmt extends Stmt {
  //赋值语句
  constructor() {
    super(ASTNodeTypes.ASSIGN_STMT, "assign")
  }
}
module.exports = AssignStmt

const { Factor, Scalar } = require("./index")
const { Expr } = require("./index")

AssignStmt.parse = (it) => {
  const stmt = new AssignStmt()
  const tk = it.peek()
  const factor = Factor.parse(it)
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
