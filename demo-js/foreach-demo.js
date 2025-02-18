/**
 * 배열
 */
const arr = [1,2,3,4,5]

arr.forEach(function(a,b,c){
	// a는 데이터, b는 인덱스 값이다.
	console.log(`a: ${a}, b: ${b}, c: ${c}`)
});
// a: 1, b: 0, c: 1,2,3,4,5
// a: 2, b: 1, c: 1,2,3,4,5
// a: 3, b: 2, c: 1,2,3,4,5
// a: 4, b: 3, c: 1,2,3,4,5
// a: 5, b: 4, c: 1,2,3,4,5

// Map과 forEach()의 만남
let map = new Map()
map.set(7,"seven")
map.set(9,"nine")
map.set(8,"eight")

map.forEach(function(a,b,c) {
    console.log(`a: ${a}, b: ${b}, c: ${c}`)
});
// a: seven, b: 7, c: [object Map]
// a: nine, b: 9, c: [object Map]
// a: eight, b: 8, c: [object Map]