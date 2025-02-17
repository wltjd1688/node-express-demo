// 모듈 세팅
const express = require('express');
const app = express();

// 서버 셋팅 : 포트 넘버(번호) 1234로 셋팅
app.listen(1234)

app.get('/', function (req, res){
    res.send('Hello World!');
});

// 유튜버 전체 조회
app.get("/youtubers", (req,res)=>{
    const allYoutubers = [...db.values()];
    res.json(allYoutubers);
})

// 개별 유퉙 조회
app.get('/youtubers/:id',(req,res)=>{
    let {id} = req.params;
    id = parseInt(id);

    const youtuber = db.get(id);
    if(youtuber!==undefined){
        res.json(db.get(id));
    } else {
        res.json({
            message: "유투버 정보를 찾을 수 없습니다."
        })
    }
});

// 유튜버 등록
app.use(express.json());
app.post('/youtubers', (req, res) => {
    console.log(req.body);

    let newYoutubers ={
        channelTitle: req.body.channelTitle,
        sub: 0,
        videoNum: 0,
    }

    const id = idx++;
    db.set(id,newYoutubers)
    
    res.send({
        "message": `${db.get(id).channelTitle}님, 유튜버 생활을 응원합니다.`
    })
})

// 데이터 세팅
let db = new Map();

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

let idx = 1;
db.set(idx++, youtuber1) // 키로 밸류를 찾을 수 있는 한 쌍을 저장
db.set(idx++, youtuber2)
db.set(idx++, youtuber3)