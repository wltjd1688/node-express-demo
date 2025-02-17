const express = require('express');
const app = express();


app.listen(1234)

app.get('/products/:n', (req, res) => {
    // : => 어? 나한테 URL로 매개변수를 전달해줄 건 가보다
    // products/__ 빈칸에 오는 값을 n이라는 변수에 담아줘
    // console.log(req.params);
    // console.log(req.params.n);

    let number = parseInt(req.params.n) - 10
    console.log(number);

    res.json({
        num : number,
    })
});

// 유튜브 채널 링크
// https://www.youtube.com/@15ya.fullmoon
// https://www.youtube.com/@ChimChakMan_Officaial
// 유튜브 영상 링크
// https://www.youtube.com/watch?v=278846465
// https://www.youtube.com/watch?v=BowC1lsdi32
// 타임라인 주소
// https://www.youtube.com/watch?v=BowC1lsdi32&t=120s
app.get('/:nickname', (req, res) => {
    const param = req.params;
    
    res.json({
        channel: param.nickname,
    })
})

// https://www.youtube.com/watch?v=BowC1lsdi32&t=120s
app.get('/watch', (req, res) => {

    const q = req.query;
    console.log(q);
    console.log(q.v)
    console.log(q.t)

    const {v,t} = req.query;
    console.log(v);
    console.log(t);
    // 변수 이름에 영향이 있다.
    // 객체에서는 변수 이름을 그대로 사용해야한다.

    res.json({
        video: v,
        titmeline: t
    }) // q가 이미 json 형태라서 그대로 사용가능 
});