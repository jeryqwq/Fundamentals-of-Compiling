const ASTNode = require("./ASTNode")
const ASTNodeTypes = require("./ASTNodeTypes")
const { Stmt } = require("./index")

class Block extends Stmt {
  constructor(parent, type, label) {
    super(parent, ASTNodeTypes.BLOCK, "BLOCK")
  }
}
module.exports = Block

Block.parse = (it) => {
  const block = new Block()
  it.nextMatch("{")
  let stmt
  while ((stmt = Stmt.parse(it)) != null) {
    block.addChild(stmt)
  }
  it.nextMatch("}")
  return stmt
}
