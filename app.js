// 모듈 세팅
const express = require('express');
const app = express();

// 서버 셋팅 : 포트 넘버(번호) 1234로 셋팅
app.listen(1234)

// body에 있는 데이터를 JSON 형식으로 파싱하기 위해 미들웨어 추가
app.use(express.json());

app.post('/test', (req, res) => {
    console.log(req.body); // POST로 넘어온 전체 body를 확인
    // body 안의 특정 데이터 확인: 예를 들어 message 프로퍼티
    console.log(req.body.message);
    res.json({
        message: `Received: ${req.body.message}`
    });
});