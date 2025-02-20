const express = require("express")
const app = express()

app.listen(7777)

let db = new Map();
let id = 1;

app.use(express.json())

app.route('/channels')
    // 채널 생성
    .post((req,res) =>{
        if (req.body.channelTitle){
            db.set(id++, req.body)

            res.status(201).json({
                message: `${db.get(id-1).channelTitle}님 채널을 응원합니다.`
            })
        } else {
            res.status(400).json({
                message: `요청 값을 제대로 보내주세요.`
            })
        }
    })

    // 채널 전체 조회
    .get((req,res) =>{
        if (db.size){
            let channels = []
            db.forEach((value)=>{
                channels.push(value)
            })
            res.status(200).json(channels);
        } else{
            res.status(404).json({message:"채널 정보를 찾을 수 없습니다."})
        }
    })

app.route('/channels/:id')
    // 채널 개별 수정
    .put((req,res) =>{
        isExist(req.body.channeltitle, res);
        let {id} = req.params;
        id = parseInt(id);
        let channel = db.get(id);

        const newTitle = req.body.channelTitle
        if (newTitle.length < 1) return res.status(401).json({
            message: "1자 이상 작성해주세요"
        })
        
        if (channel) {
            const oldtitle = channel.channelTitle

            channel.channelTitle = newTitle;
            db.set(id, channel)

            res.status(200).json({
                message: `${oldtitle}이 ${newTitle}로 수정되었습니다.`
            })
        } else {
            res.status(400).json({
                message: "채널 정보를 찾을 수 없습니다."
            })
        }
    })

    // 채널 개별 삭제
    .delete((req,res) =>{
        let {id} = req.params;
        id = parseInt(id);
        let channel = db.get(id);

        if (channel) {
            db.delete(id);
            res.status(200).json({
                message: `${channel.channelTitle}이 삭제되었습니다.`
            })
        } else {
            res.status(400).json({
                message: "채널 정보를 찾을 수 없습니다."
            })
        }
    })

    // 채널 개별 조회
    .get((req,res) =>{
        let {id} = req.params;
        id = parseInt(id);
        let channel = db.get(id);

        if (channel) {
            res.status(200).json(channel)
        } else {
            res.status(400).json({
                message: "채널 정보를 찾을 수 없습니다."
            })
        }
    })

function isExist(obj, response, text="입력한 값을 확인해주세요"){
    if (obj) {
        return response.status(400).json({ message: text})
    }
};