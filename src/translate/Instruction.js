const instructionTypes = require("./instructionType")
module.exports = class TaInstruction {
  constructor(type, res, op, agr1, arg2) {
    this.type = type
    this.result = res
    this.op = op
    this.arg1 = arg1
    this.arg2 = arg2
  }
  toString() {
    switch (this.type) {
      case instructionTypes.ASSIGN:
        if (this.arg2) {
          return `${this.result} = ${this.arg1} ${this.op} ${this.arg2}`
        } else {
          return `${this.result} = ${this.arg1}`
        }
        break
      case instructionTypes.IF:
        return `IF ${this.arg1} ELSE ${this.arg2}`
        break
      case instructionTypes.GOTO: {
        return `GOTO ${this.arg1}`
      }
      case instructionTypes.PARAM: {
        return `PARAM ${this.arg1} ${this.arg2}`
      }
      case instructionTypes.LABEL: {
        return `${this.arg1}`
      }
      case instructionTypes.RETURN: {
        return `RETURN ${this.arg1}`
      }
      case instructionTypes.SP: {
        return `SP ${this.arg1}`
      }
      case instructionTypes.CALL: {
        return `CALL ${this.arg1.getLabel()}`
      }
    }
    throw new Error("unknow instruction type" + this.type)
  }
}
