const ASTNode = require("./ASTNode")
const Stmt = require("./Stmt")
const ASTNodeTypes = require("./ASTNodeTypes")
class IfStmt extends Stmt {
  constructor(parent, type, label) {
    super(parent, ASTNodeTypes.IF_STMT, "if")
  }
  getExpr() {
    return this.getChild(0)
  }
  getBlock() {
    return this.getChild(1)
  }
  getElseBlock() {
    let block = this.getChild(2)
    if (block instanceof Block) {
      return block
    }
    return null
  }
  getElseIfBlcok() {
    let block = this.getChild(2)
    if (block instanceof IfStmt) {
      return block
    }
    return null
  }
}

module.exports = IfStmt
const { Block, Expr } = require("./index")

IfStmt.parse = (it) => {
  const lexeme = it.nextMatch("if")
  const stmt = new IfStmt()
  stmt.setLexeme(stmt)
  it.nextMatch("(")
  const expr = Expr.parse(it)
  stmt.addChild(expr)
  it.nextMatch(")")

  const block = Block.parse(it)
  stmt.addChild(block)
  const tail = IfStmt.parseTail(it)
  stmt.addChild(tail)
  return stmt
}
IfStmt.parseTail = (it) => {
  if (!it.hasNext() || it.peek().getVal() !== "else") {
    return null
  }
  it.nextMatch("else")
  const lookahead = it.peek()
  if (lookahead.getVal() === "{") {
    const block = Block.parse(it)
    return block
  } else if (lookahead.getVal() === "if") {
    return IfStmt.parse(it)
  }
  return null
}
