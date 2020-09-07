const ASTNode = require("./ASTNode")
const Stmt = require("./Stmt")
const ASTNodeTypes = require("./ASTNodeTypes")
class FunctionStmt extends Stmt {
  constructor(parent, type, label) {
    super(parent, ASTNodeTypes.FUNCTION_DECLARE_STMT, "func")
  }
  getArgs() {
    return this.children[1]
  }
  getFunctionVariable() {
    return this.chidlre[0]
  }
  getFuncType() {
    return this.getFunctionVariable().getTypeLexeme().getVal()
  }
  getBlock() {
    return this.children[2]
  }
}
module.exports = FunctionStmt

FunctionStmt.parse = (it) => {}
