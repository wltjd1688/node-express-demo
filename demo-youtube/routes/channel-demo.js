const express = require("express")
const router = express.Router()

const db = require('../mariadb')

// let db = new Map();
// let id = 1;

router.route('/')
    // 채널 생성
    .post((req,res) =>{
        const {channelTitle, userId} = req.body;
            // db.set(id++, req.body)

            let insertValueSQL = `INSERT INTO Users (name, user_id) VALUES ("${channelTitle}","${userId}")`;
            db.query(insertValueSQL, function(err,result,fields){
                if (result && result.length > 0){
                    console.log("채널 생성에 성공했습니다.")
                    res.status(201).json({
                        message: `${channelTitle}님 채널을 응원합니다.`
                    })
                } else {
                    console.log("채널 생성에 실패했습니다.")
                    res.status(400).json({
                        message: `요청 값을 제대로 보내주세요.`
                    })
                }
            })


    })

    // 채널 전체 조회
    .get((req,res) =>{
        let {userId} = req.body
        if(!userId) return notFoundChannels(res);
        // db.forEach((value)=>{
        //     if (value.userId === userId) channels.push(value)
        // })
            
        let selChannelSQL = `SELECT * FROM channels WHERE user_id=${userId}`;
        db.query(selChannelSQL, function(err, result, fields){
            if (result && result.length > 0) {
                console.log(`${userId}의 채널 불러오기 성공`)
                res.status(200).json(result)
            } else {
                console.log(err)
                notFoundChannels(res)
            }
        })
    })

router.route('/:id')
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
            notFoundChannels(res)
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
            notFoundChannels(res)
        }
    })

    // 채널 개별 조회
    .get((req,res) =>{
        let {id} = req.params;
        id = parseInt(id);
        // let channel = db.get(id);

        let selChannelSQL = `SELECT * FROM channels WHERE id=${id}`;
        db.query(selChannelSQL, function(err, result, fields){
            if (result && result.length > 0) {
                console.log(`${id}채널 불러오기 성공`)
                res.status(200).json(result)
            } else {
                notFoundChannels(res)
            }
        })
    })

function isExist(obj, response, text="입력한 값을 확인해주세요"){
    if (obj) {
        return response.status(400).json({ message: text})
    }
};

function notFoundChannels(res){
    res.status(400).json({
        message: "채널 정보를 찾을 수 없습니다."
    })
}

module.exports = router