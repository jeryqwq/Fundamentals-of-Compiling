const ASTNode = require("./ASTNode")
const Stmt = require("./Stmt")
const ASTNodeTypes = require("./ASTNodeTypes")
class FunctionArgs extends Stmt {
  constructor(parent) {
    super(parent, ASTNodeTypes.FUNCTION_ARGS, "functionArgs")
  }
}
module.exports = FunctionArgs
const { Factor } = require("./index")

FunctionArgs.parse = (it) => {
  const args = new FunctionArgs()
  const tk = it.peek()
  while (tk.isType()) {
    const token = it.next()
    const variable = Factor.parse(it)

    if (variable) {
      args.addChild(variable)
      variable.lexeme.type = token.getType()
    }
    const pk = it.peek()
    if (pk.getVal() !== ")") {
      it.nextMatch(",")
    } else {
      return args
    }
  }
  return args
}
