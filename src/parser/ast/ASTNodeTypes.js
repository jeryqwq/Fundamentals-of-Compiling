const Enum = require("./../../common/enum")

const AstNodeTypes = {
  BLOCK: new Enum("BLOCK", 1), //作用域块
  BINARY_EXPR: new Enum("BINARY_EXPR", 2), //三元
  UNARY_EXPR: new Enum("UNARY_EXPR", 3), //二元
  VARIABLE: new Enum("VARIABLE", 4), //变量
  IF_STMT: new Enum("IF_STMT", 5), //if判断
  WHILE_STMT: new Enum("WHILE_STMT", 6), //while循坏
  FOR_STMT: new Enum("FOR_STMT", 7), //for循环
  ASSIGN_STMT: new Enum("ASSIGN_STMT", 8), //
  DECLARE_STMT: new Enum("DECLARE_STMT", 9), //
  FUNCTION_DECLARE_STMT: new Enum("FUNCTION_DECLARE_STMT", 10), //函数
  SCALAR: new Enum("SCALAR", 11), //
}
module.exports = AstNodeTypes
