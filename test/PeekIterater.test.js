const PeekIterator = require("../src/common/peekIterator")
const arraytoGenerator = require("../src/common/arraytoGenerator")
const chai = require("chai"),
  expect = chai.expect,
  should = chai.should()
const peek = new PeekIterator(arraytoGenerator([..."123456", "/0"]))
expect(peek.next()).equal("1")
expect(peek.next()).equal("2")
expect(peek.next()).equal("3")

expect(peek.peek()).equal("4")
expect(peek.peek()).equal("4")
expect(peek.next()).equal("4")

expect(peek.peek()).equal("5")
expect(peek.peek()).equal("5")

expect(peek.hasNext()).equal(true)
expect(peek.next()).equal("5")
expect(peek.next()).equal("6")
expect(peek.next()).equal("/0")

expect(peek.hasNext()).equal(false)
peek.putBack()
peek.putBack()
expect(peek.next()).equal("6")
