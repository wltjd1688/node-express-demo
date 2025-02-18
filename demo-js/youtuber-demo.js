// 모듈 세팅
const express = require('express');
const app = express();

// 서버 셋팅 : 포트 넘버(번호) 1234로 셋팅
app.listen(1234)

// 유튜버 등록
app.use(express.json());

app.get('/', function (req, res){
    res.send('Hello World!');
});

// 유튜버 전체 조회
app.get("/youtubers", (req,res)=>{
    try{
        let youtuber_json = {};
        db.forEach((value, key) => {youtuber_json[key] = value});
        res.json(youtuber_json);
    } catch(error){
        return res.status(500).json({ message: "서버와 연결에 실패하였습니다."})
    }

})

function isInteger(text, response){
    const num = Number(text);
    if (Number.isInteger(num) && num > 0) {
        return num;
    } else {
        response.status(400).json({ message: "올바른 주소를 다시 입력해주세요"})
        return null;
    }
}

// 개별 유퉙 조회
app.get('/youtubers/:id',(req,res)=>{
    try{
        let {id} = req.params;
        id = isInteger(id, res);
    
        const youtuber = db.get(id);
        if(youtuber!==undefined){
            res.json(db.get(id));
        } else {
            res.status(404).json({
                message: "유투버 정보를 찾을 수 없습니다."
            })
        }
    } catch(error){
        return res.status(500).json({ message: "서버와 연결에 실패하였습니다."})
    }
});

app.post('/youtubers', (req, res) => {
    try {
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
    } catch(error){
        return res.status(500).json({ message: "서버와 연결에 실패하였습니다."})
    }
})

// 개별 삭제
app.delete('/youtubers/:id', (req, res) => {
    let {id} = req.params;
    id = isInteger(id, res);

    const youtuber = db.get(id);
    if(youtuber!==undefined){
        const channelTitle = youtuber.channelTitle;
        db.delete(id);
        res.json({
            message: `${channelTitle}님, 아쉽지만 다음에 또 뵙겠습니다.`
        })
    } else {
        res.status(404).json({
            message: `요청하신 ${id}번은 없는 유튜버입니다.`
        })
    }
})
// 전체 삭제
app.delete('/youtubers', (req, res) => {
    try{
        if (db.size >1){
            db.clear()
            // or 
            // db.forEach((a)=>{
            //     db.delete(a)
            // })
            res.json({
                message: "전체 유튜버가 삭제되었습니다."
            })
        } else {
            res.status(404).json({
                message: "삭제할 유튜버가 없습니다."
            })
        }   
    } catch(error){
        return res.status(500).json({ message: "서버와 연결에 실패하였습니다."})
    }
})

// 유튜버 이름 수정
app.put('/youtubers/:id', (req, res) =>{
    try {
        let {id} = req.params;
        let newTitle = req.body.channelTitle;
        id = isInteger(id, res);
    
        let youtuber = db.get(id);
        const oldTitle = youtuber.channelTitle;
        if(youtuber!==undefined){
            youtuber.channelTitle = newTitle;
            db.set(id, youtuber);

            res.json({
                message: `${oldTitle}님, 채널명이 ${newTitle}로 변경 되었습니다.`
            })
        } else {
            res.status(404).json({
                message: `요청하신 ${id}번은 없는 유튜버입니다.`
            })
        }
    } catch(error){
        return res.status(500).json({ message: "서버와 연결에 실패하였습니다."})
    }
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