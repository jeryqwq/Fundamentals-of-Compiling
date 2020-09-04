module.exports = {
  get Block() {
    return require("./Block")
  },
  get Variable() {
    return require("./Variable")
  },
  get Factor() {
    return require("./Factor")
  },
  get Scalar() {
    return require("./Scalar")
  },
  get Expr() {
    return require("./Expr")
  },
  get AssignStmt() {
    return require("./AssignStmt")
  },
  get DecalreStmt() {
    return require("./DecareStmt")
  },
  get IfStmt() {
    return require("./IfStmt")
  },
  get Stmt() {
    return require("./Stmt")
  },
}
