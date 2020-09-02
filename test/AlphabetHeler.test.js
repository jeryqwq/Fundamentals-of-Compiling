const AlphabetHelper = require("./../src/lexer/AlphabetHelper")
const chai = require("chai"),
  expect = chai.expect
expect(AlphabetHelper.isNumber("1")).equal(true) //数字
expect(AlphabetHelper.isLetter("a")).equal(true) //大小写字母
expect(AlphabetHelper.isLiteral("_")).equal(true) //字母活着下划线  变量
expect(AlphabetHelper.isOperator("/")).equal(true) //操作符
expect(AlphabetHelper.isOperator("%")).equal(true) //操作符
expect(AlphabetHelper.isOperator("*")).equal(true) //操作符
expect(AlphabetHelper.isOperator("+")).equal(true) //操作符
