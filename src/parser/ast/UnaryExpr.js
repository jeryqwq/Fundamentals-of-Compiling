const ASTNode = require("./ASTNode")
const Stmt = require("./Stmt")
const ASTNodeTypes = require("./ASTNodeTypes")
module.exports = class UNARY_EXPR extends Stmt {
  constructor(parent, type, label) {
    super(parent, ASTNodeTypes.UNARY_EXPR, "unary")
  }
}
