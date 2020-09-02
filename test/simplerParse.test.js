const SimpleParse = require("./../src/parser/simpleParse")
const arraytoGenerator = require("./../src/common/arraytoGenerator")
const Lexer = require("./../src/lexer/Lexer")
const PeekTokenInterator = require("./../src/parser/util/PeekTokenIterator.js")

const source = arraytoGenerator([..."1+2+3+4 "])
const lexer = new Lexer()
const tokens = lexer.analyse(source)
const tokensIt = new PeekTokenInterator(arraytoGenerator([...tokens]))
const epxr = SimpleParse.parse(tokensIt)
epxr.print()
const v1 = epxr.getChild(0),
  e2 = epxr.getChild(1)
console.log(v1.lexeme.getVal(), "v1-------------")
console.log(e2.lexeme.getVal(), "e2-------------")
const v2 = e2.getChild(0),
  e3 = e2.getChild(1)
console.log(v2.lexeme.getVal(), "v1 1-------------2")
console.log(e3.lexeme.getVal(), "v1 2-------------+")
const v3 = e3.getChild(0),
  v4 = e3.getChild(1)
console.log(v3.lexeme.getVal(), "3-------------")
console.log(v4.lexeme.getVal(), "4-------------")
