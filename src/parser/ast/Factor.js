const ASTNode = require("./ASTNode")
const TokenType = require("./../../lexer/TokenType")
const AstNodeTypes = require("./ASTNodeTypes")
class Factor extends ASTNode {
  constructor(parent, it) {
    super(parent)
    const token = it.next()
    if (!token) return
    const val = token.getVal(),
      type = token.getType()
    this.label = val
    this.lexeme = token
    if (type === TokenType.VARIABLE) {
      this.type = AstNodeTypes.VARIABLE
    } else {
      this.type = AstNodeTypes.SCALAR
    }
  }
}

module.exports = Factor
const { Variable, Scalar } = require("./index")

Factor.parse = (it) => {
  const token = it.peek()
  const type = token.getType()
  if (type === AstNodeTypes.VARIABLE) {
    it.next()
    return new Variable(null, it)
  } else if (type === AstNodeTypes.SCALAR) {
    it.next()
    return new Scalar(null, it)
  }
  return null
}
