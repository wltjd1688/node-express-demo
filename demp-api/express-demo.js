const express = require('express');
const app = express();

// 서버 셋팅 : 포트 넘버(번호) 1234로 셋팅
app.listen(1234)

// GET + "/"
app.get('/', function (req, res){
    res.send('Hello World!');
});

let nodejsBook = {
    title: 'Node.js를 공부해보자',
    price: 20000,
    description: "이 책 좋음 왜? 김송아가 지음"
}

app.get('/products/1', function(req, res){
    res.json(nodejsBook);
})