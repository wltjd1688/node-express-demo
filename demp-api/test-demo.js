const express = require('express');
const app = express();

// 서버 셋팅 : 포트 넘버(번호) 1234로 셋팅
app.listen(1234)

// API : GET = "http:loclocalhostP:1234/test"
// "TEST SUCCESS"
app.get('/test', function (req, res){
    res.send('Test');
});

// API : GET = "http:loclocalhostP:1234/test/1"
// "One!!"
app.get('/test/1', function (req, res){
    res.send("One!!");
});

