const express = require('express');
const app = express();


app.listen(1234)


// 유튜브 채널 링크
// https://www.youtube.com/@15ya.fullmoon
// https://www.youtube.com/@ChimChakMan_Officaial
// 유튜브 영상 링크
// https://www.youtube.com/watch?v=278846465
// https://www.youtube.com/watch?v=BowC1lsdi32
// 타임라인 주소
// https://www.youtube.com/watch?v=BowC1lsdi32&t=120s

let youtuber1 = {
    channelTitle: "십오야",
    sub: "594만명",
    videoNum: "993개"
}

let youtuber2 = {
    channelTitle: "침착맨",
    sub: "272만명",
    videoNum: "6.6천개"
}

let youtuber3 = {
    channelTitle: "테오",
    sub: "54.8만명",
    videoNum: "726개"
}

app.get('/:nickname', (req, res) => {
    
    const {nickname} = req.params;
    
    if(nickname === "@15ya.fullmoon") {
        res.json(youtuber1);
    } else if (nickname === "@ChimChakMan_Officaial") {
        res.json(youtuber2);
    } else if (nickname === "@TEO_universe") {
        res.json(youtuber3);
    } else {
        res.json({
            message: "저희가 모르는 유튜버입니다."
        })
    }

    // 개발자가 생각지 못한 예러 = 예외가 발생!!
})

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