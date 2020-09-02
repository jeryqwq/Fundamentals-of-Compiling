const ASTNode = require("./ASTNode")
const Stmt = require("./Stmt")
const ASTNodeTypes = require("./ASTNodeTypes")
module.exports = class Block extends Stmt {
  constructor(parent, type, label) {
    super(parent, ASTNodeTypes.BLOCK, "BLOCK")
  }
}
