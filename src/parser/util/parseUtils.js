const AstNodeTypes = require("../ast/ASTNodeTypes")

module.exports = class ParseUtils {
  static toPostFixExpression(astNode) {
    if (!astNode) return ""
    switch (astNode.type) {
      case AstNodeTypes.BINARY_EXPR:
      case AstNodeTypes.OPERATOR:
        return `${this.toPostFixExpression(
          astNode.getChild(0)
        )} ${this.toPostFixExpression(
          astNode.getChild(1)
        )} ${astNode.lexeme.getVal()}`
      case AstNodeTypes.SCALAR:
      case AstNodeTypes.VARIABLE:
        return astNode.lexeme.getVal()
        break
    }
  }
}
