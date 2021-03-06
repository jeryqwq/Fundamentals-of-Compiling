const ASTNode = require("./ASTNode")
class Stmt extends ASTNode {
  constructor(parent, type, label) {
    super(parent, type, label)
  }
}
module.exports = Stmt
Stmt.parse = (it) => {
  const {
    AssignStmt,
    DecalreStmt,
    IfStmt,
    FunctionDeclareStmt,
    ReturnStmt,
  } = require("./index")
  if (!it.hasNext()) {
    return null
  }
  const token = it.next()
  const lookhead = it.peek()
  it.putBack()
  if (token.isVariable() && lookhead.getVal() === "=") {
    return AssignStmt.parse(it)
  } else if (token.getVal() === "let" && lookhead.isVariable()) {
    return DecalreStmt.parse(it)
  } else if (token.getVal() === "if") {
    return IfStmt.parse(it)
  } else if (token.getVal() === "func") {
    return FunctionDeclareStmt.parse(it)
  } else if (token.getVal() === "return") {
    return ReturnStmt.parse(it)
  }
}
