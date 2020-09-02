const Factor = require("./Factor")
const Stmt = require("./Stmt")
const ASTNodeTypes = require("./ASTNodeTypes")
module.exports = class Scalar extends Factor {
  constructor(parent, it) {
    super(parent, it)
  }
}
