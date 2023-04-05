function reversePolishNot(array) {
  let stack = []
  const operations = {
      "+": (a,b) => a + b,
      "-": (a,b) => a - b,
      "*": (a,b) => a * b,
      "/": (a,b) => Math.trunc(a / b)
  }
  for (let i of array) {
      if (operations[i]){
          let first = stack.pop()
          let second = stack.pop()
          stack.push(operations[i](second, first))
      }
      else {
          stack.push(parseInt(i))
      }
  }
  return stack.pop()
}

let arr1 = ["4","2","+","5","*"]
let arr2 = ["4","13","5","/","+"]

console.log(reversePolishNot(arr1));
console.log(reversePolishNot(arr2));