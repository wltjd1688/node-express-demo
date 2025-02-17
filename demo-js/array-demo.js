// 자바스크립트 배열 비구조화

const array = [1, 2, 3, 4, 5];
const [,num2, num3,, num5] = array;

console.log(num2); // 2
console.log(num3); // 3
console.log(num5); // 5

const num1 = array[0];
const num4 = array[3];

console.log(num1); // 1
console.log(num4); // 4