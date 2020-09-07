const SimpleParse = require("../src/parser/simpleParse")
const arraytoGenerator = require("../src/common/arraytoGenerator")
const Lexer = require("../src/lexer/Lexer")
const PeekTokenInterator = require("../src/parser/util/PeekTokenIterator.js")
const PeekIterator = require("../src/common/peekIterator")
const ParseUtils = require("../src/parser/util/parseUtils")
const Expr = require("../src/parser/ast/Expr")
const { AssignStmt, DecalreStmt, IfStmt } = require("./../src/parser/ast")
const chai = require("chai"),
  expect = chai.expect,
  assert = chai.assert
function createToken(str) {
  const gen = arraytoGenerator([...str])
  const lexer = new Lexer()
  const tokens = lexer.analyse(gen)
  const its = new PeekTokenInterator(arraytoGenerator(tokens))
  return its
}
// const expr = AssignStmt.parse(createToken("i = 5 * 3 "))
// console.log(expr)
// console.log(ParseUtils.toPostFixExpression(expr))
// const expr2 = DecalreStmt.parse(createToken("let i = 5 * 3 "))
// console.log(expr2)
// console.log(ParseUtils.toPostFixExpression(expr2))
const stmt = IfStmt.parse(
  createToken(`if(b){
  a = 2
}  `)
)
const expr3 = stmt.getExpr()
// const block = stmt.getBlcok()
const assignStmt = stmt.getChild(0)
const block = stmt.getChild(1)
const elseBlock = stmt.getChild(2)
console.log(expr3.lexeme.getVal() === "b")
console.log(block.getChild(0).lexeme.getVal() === "=")
console.log(elseBlock === null)
