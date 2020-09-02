const AlphabetHelper = require("./../src/lexer/AlphabetHelper")
const PeekIterator = require("../src/common/peekIterator")
const arraytoGenerator = require("../src/common/arraytoGenerator")
const Token = require("./../src/lexer/Token")
const tokenType = require("./../src/lexer/TokenType")
const Lexer = require("./../src/lexer/Lexer")
const chai = require("chai"),
  expect = chai.expect,
  assert = chai.assert

const lex = new Lexer()
const lex2 = new Lexer()

lex.analyse(arraytoGenerator([..."chen+jie^100.12==+100-12 "]))
lex2.analyse(
  arraytoGenerator([
    ...`func add(a,b){
    return a+b
  } 
  //这是注释语句，应该被忽略
  /*
  这是注释语句，应该被忽略
  */
  add(3,6)
`,
  ])
)
console.log(lex, "----------")
console.log(lex2, "----------")
