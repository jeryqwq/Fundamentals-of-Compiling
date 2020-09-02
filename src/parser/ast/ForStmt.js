const ASTNode = require("./ASTNode")
const Stmt = require("./Stmt")
const ASTNodeTypes = require("./ASTNodeTypes")
module.exports = class ForStmt extends Stmt {
  constructor(parent, type, label) {
    super(parent, ASTNodeTypes.FOR_STMT, "for")
  }
}
