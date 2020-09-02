const ASTNode = require("./ASTNode")
const { AssignStmt, DecalreStmt, IfStmt } = require("./index")
module.exports = class Stmt extends ASTNode {
  constructor(parent, type, label) {
    super(parent, type, label)
  }
}
Stmt.parse = (it) => {
  if (!it.hasNext()) {
    return null
  }
  const token = it.next()
  const lookhead = it.next()
  it.putBack()
  if (token.isVariable() && lookhead.getVal() === "=") {
    return AssignStmt.parse(it)
  } else if (token.getVal() === "let" && lookhead.isVariable()) {
    return DecalreStmt.parse(it)
  } else if (token.getVal() === "if") {
    return IfStmt.parse(it)
  }
}
