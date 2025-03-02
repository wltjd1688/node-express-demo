var jwt = require('jsonwebtoken');
var dotenv = require('dotenv');

// .env파일 사용하겠다는 선언
dotenv.config();

var token = jwt.sign({ foo: 'bar' }, process.env.PRIVATE_KEY);
// token 생성 = jwt 서명을 했다! (페이로드, 나만의 암호키) + SHA256

console.log(token);

// 검증
// 검증에 성공하면 페이로드 값을 확인할 수 있음!

var decoded = jwt.verify(token, process.env.PRIVATE_KEY);
console.log(decoded) // bar
