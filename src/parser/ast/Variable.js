const { Factor } = require("./index")
const Stmt = require("./Stmt")
const ASTNodeTypes = require("./ASTNodeTypes")
module.exports = class Variable extends Factor {
  constructor(parent, it) {
    super(parent, it)
  }
}
