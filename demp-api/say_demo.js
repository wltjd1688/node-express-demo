const express = require('express');
const app = express();

// 서버 셋팅 : 포트 넘버(번호) 1234로 셋팅
app.listen(1234)

// GET + "/"
app.get('/', function (req, res){
    res.send('Hello World!');
});

app.get('/hello', function (req, res){
    res.json({
        say: '안녕하세요!'
    });
});

app.get('/bye', function (req, res){
    res.json({
        say: '안녕히 가세요'
    });
});

app.get('/nicetomeetyou', function (req, res){
    res.json({
        say: '만나서 반갑습니다'
    });
});