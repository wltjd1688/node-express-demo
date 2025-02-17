if (true) {
    var num1 = 7;

    const num2 = 3;
    let num3 = 5;

    num3 = 21;

    console.log(num1 + " X " + num2 + " = " + num3);
    console.log(`${num1} X ${num2} = ${num3}`); // 템플릿 문자열
}

console.log(num1); // 7
console.log(num2); // ReferenceError: num2 is not defined
console.log(num3); // 21