const SimpleParse = require("../src/parser/simpleParse")
const arraytoGenerator = require("../src/common/arraytoGenerator")
const Lexer = require("../src/lexer/Lexer")
const PeekTokenInterator = require("../src/parser/util/PeekTokenIterator.js")
const PeekIterator = require("../src/common/peekIterator")
const ParseUtils = require("../src/parser/util/parseUtils")
const Expr = require("../src/parser/ast/Expr")
const chai = require("chai"),
  expect = chai.expect,
  assert = chai.assert
function createExpr(str) {
  const gen = arraytoGenerator([...str])
  const lexer = new Lexer()
  const tokens = lexer.analyse(gen)
  const its = new PeekTokenInterator(arraytoGenerator(tokens))
  return Expr.parseExpr(null, its)
}
const its = createExpr(`"1" == "" 
//这是注释语句，词法分析analyse解析跳过
/* 
  块注释
*/
`) //等式字符串转换
let transformed = ParseUtils.toPostFixExpression(its)
assert.equal(transformed, `"1" "" ==`)
const test2 = ParseUtils.toPostFixExpression(createExpr(`7+2+3+5 `)) //加数转后续遍历
assert.equal(test2, `7 2 3 5 + + +`)
const test3 = ParseUtils.toPostFixExpression(createExpr(`2*7+2 `)) //乘号优先原则
assert.equal(test3, `2 7 * 2 +`)
const expr4 = createExpr(` 2*(7+2) `) //括号优先原则
const test4 = ParseUtils.toPostFixExpression(expr4)
assert.equal(test4, `2 7 2 + *`)
const expr5 = createExpr(`(3*2+3-(5-1))!=5+5*2 `) //等式分解
const test5 = ParseUtils.toPostFixExpression(expr5)
assert.equal(test5, `3 2 * 3 5 1 - - + 5 5 2 * + !=`)
