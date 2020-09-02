const ASTNode = require("./ASTNode")
const Stmt = require("./Stmt")
const ASTNodeTypes = require("./ASTNodeTypes")
module.exports = class WHILE_STMT extends Stmt {
  constructor(parent, type, label) {
    super(parent, ASTNodeTypes.WHILE_STMT, "WHILE_STMT")
  }
}
