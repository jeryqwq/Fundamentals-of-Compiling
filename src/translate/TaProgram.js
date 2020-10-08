const StaticSymbolTable = require("./symbol/StaticSymbolTable")
const SymbolType = require("./symbol/SymbolTypes")
const Instruction = require("./Instruction")
const InstructionTypes = require("./instructionType")

module.exports = class TaProgram {
  constructor() {
    this.instructions = []
    this.staticSymbolTable = new StaticSymbolTable()
    this.labelCounter = 0
  }
  add(ins) {
    this.instructions.push(ins)
  }
  toString() {
    return this.instructions.map((item) => item.toString()).join("/n")
  }
  addLabel() {
    const label = "L" + this.labelCounter++
    const taIns = new Instruction(InstructionTypes.LABEL, null, null, label)
    this.instructions.push(taIns)
    return taIns
  }
  setStaticSymbolTable(symbolTable) {
    for (const iterator of this.staticSymbolTable.getSymbols()) {
      if (iterator.getType() === SymbolType.IMMEDIATE_SYMBOL) {
        this.staticSymbolTable.push(iterator)
      }
    }
    for (const iterator of symbolTable.getChildren()) {
      this.setStaticSymbolTable(iterator)
    }
  }
}
