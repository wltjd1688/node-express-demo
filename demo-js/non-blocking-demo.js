
function first() {
    console.log("첫 번째");
}

function second() {
    console.log("두 번째");
}

function third() {
    console.log("세 번째");
}

first();
setImmediate(second, 2000);
// 2초 뒤에 second 함수를 실행합니다.
// 함수의 매개변수로 변수 또는 값을 전달하는 것이 아니라, 함수를 전달하는 것!