const ASTNode = require("./ASTNode")
const Stmt = require("./Stmt")
const ASTNodeTypes = require("./ASTNodeTypes")
const ParseException = require("./../util/Exception")
const TokenTypes = require("./../../lexer/TokenType")
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
const { Factor, FunctionArgs, Block } = require("./index")

FunctionStmt.parse = (it) => {
  it.nextMatch("func") //吃掉func
  const func = new FunctionStmt() //函数
  const funcVarible = Factor.parse(it) //解析语句快
  func.addLexeme(funcVarible.getLexeme())
  func.addChild(funcVarible)
  it.nextMatch("(")
  const args = FunctionArgs.parse(it)
  func.addChild(args) //解析参数
  it.nextMatch(")") //闭合
  const keyword = it.nextMatchType(TokenTypes.KEYWORD)
  if (!keyword.isType()) {
    throw ParseException.fromToken(keyword)
  }
  funcVarible.setTypeLexeme(keyword)
  const bk = Block.parse(it)
  funcVarible.addChild(bk)
  return func
}
