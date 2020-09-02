const ASTNode = require("./ASTNode")
const Stmt = require("./Stmt")
const ASTNodeTypes = require("./ASTNodeTypes")
module.exports = class BINARY_EXPR extends Stmt {
  constructor(parent, type, label) {
    super(parent, ASTNodeTypes.BINARY_EXPR, "BINARY_EXPR")
  }
}
