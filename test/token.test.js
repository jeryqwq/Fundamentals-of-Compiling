const PeekIterator = require("../src/common/peekIterator")
const arraytoGenerator = require("../src/common/arraytoGenerator")
const Token = require("./../src/lexer/Token")
const tokenType = require("./../src/lexer/TokenType")

const chai = require("chai"),
  expect = chai.expect,
  should = chai.should()
let it1 = new PeekIterator(arraytoGenerator([..."true t"]))
let it2 = new PeekIterator(arraytoGenerator([..."if true"]))
let token1 = Token.makeVarOrKeyword(it1)
let token2 = Token.makeVarOrKeyword(it2)
expect(token1.getType()).equal(tokenType.BOOLEAN.type)
expect(token1.getVal()).equal("true")

expect(token2.getType()).equal(tokenType.KEYWORD.type)
expect(token2.getVal()).equal("if")

it1.next()
let token1_1 = Token.makeVarOrKeyword(it1)
expect(token1_1.getType()).equal(tokenType.VARIABLE.type)
expect(token1_1.getVal()).equal("t")

const tests = [
  arraytoGenerator([...`"123456"`]),
  arraytoGenerator([...`'123456'`]),
]
let it_str = new PeekIterator(tests[0])
let token_str = Token.makeString(it_str)
expect(token_str.getType()).equal(tokenType.STRING.type)
expect(token_str.getVal()).equal(`"123456"`)

const tests2 = ["!=c", "*= eqw123"]
let it_op = new PeekIterator(arraytoGenerator([...tests2[0]]))

let it_op2 = new PeekIterator(arraytoGenerator([...tests2[1]]))
let token3 = Token.makeOp(it_op)
let token_op = Token.makeOp(it_op2)
expect(token3.getType()).equal(tokenType.OPERATOR.type)
expect(token3.getVal()).equal("!=")

expect(token_op.getType()).equal(tokenType.OPERATOR.type)
expect(token_op.getVal()).equal("*=")

const num_token = new PeekIterator(arraytoGenerator([..."+123.5 bbb"]))
const num_token2 = new PeekIterator(arraytoGenerator([..."-345 ddd"]))
const token_num2 = Token.makeNumber(num_token2)
expect(token_num2.getType()).equal(tokenType.INTEGER.type)
expect(token_num2.getVal()).equal("-345")

const token_num = Token.makeNumber(num_token)
expect(token_num.getType()).equal(tokenType.FLOAT.type)
expect(token_num.getVal()).equal("+123.5")
