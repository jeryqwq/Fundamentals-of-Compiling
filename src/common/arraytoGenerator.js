module.exports = function* arraytoGenerator(arr) {
  for (let i = 0; i < arr.length; i++) {
    yield arr[i]
  }
}
