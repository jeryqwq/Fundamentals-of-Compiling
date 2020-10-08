const Enum = require("./../common/enum")
module.exports = {
  ASSIGN: new Enum("ASSIGN", 1),
  GOTO: new Enum("GOTO", 2),
  IF: new Enum("IF", 3),
  LABEL: new Enum("LABEL", 4),
  CALL: new Enum("CALL", 5),
  RETURN: new Enum("RETURN", 6),
  PARAM: new Enum("PARAM", 7),
  SP: new Enum("SP", 8),
}
