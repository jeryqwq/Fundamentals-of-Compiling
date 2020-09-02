const ASTNode = require("./ASTNode")
const Stmt = require("./Stmt")
const ASTNodeTypes = require("./ASTNodeTypes")
module.exports = class Function extends Stmt {
  constructor(parent, type, label) {
    super(parent, ASTNodeTypes.FUNCTION_DECLARE_STMT, "func")
  }
}
