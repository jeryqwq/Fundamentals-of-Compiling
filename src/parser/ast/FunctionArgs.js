const ASTNode = require("./ASTNode")
const Stmt = require("./Stmt")
const ASTNodeTypes = require("./ASTNodeTypes")
module.exports = class FunctionArgs extends Stmt {
  constructor(parent) {
    super(parent, ASTNodeTypes.FUNCTION_ARGS, "functionArgs")
  }
}
module.exports = FunctionArgs

FunctionArgs.parse = (it) => {
  const args = new FunctionArgs()
}
