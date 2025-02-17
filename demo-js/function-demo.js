// function Declaration
function add1(x,y) {
    return x + y;
}

console.log(add1(1,2)); // 3

// Function Expression
let add2 = function(x,y) {
    return x + y;
}
console.log(add2(1,2)); // 3

// Arrow Function
const add3 = (x, y) => {
    return x + y;
}
console.log(add3(1,2)); // 3

// Arrow Function with implicit return (single line)
var add4 = (x, y) => x + y;
console.log(add4(1,2)); // 3






// Function created using Function constructor
var add5 = new Function('x','y','return x + y');
console.log(add5(1,2)); // 3