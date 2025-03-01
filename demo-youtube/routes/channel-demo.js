const express = require("express")
const router = express.Router()
const db = require('../mariadb')
const {body, validationResult, param} = require('express-validator')

const validate = (res,req) => {
    const err = validationResult(req);

    if (!err.isEmpty()){
        return res.status(400).json(err.array())
    } else {
        return next();
    }
}

router.route('/')
    // 채널 생성
    .post(
        [
            body('userId').notEmpty().isInt().withMessage('숫자 입력필요!'),
            body('channelTitle').notEmpty().isString().withMessage('문자 입력필요!'),
            validate
        ]
        ,(req,res) =>{
            const {channelTitle, userId} = req.body;
            // db.set(id++, req.body)

            // if (channelTitle && userId){
            let insertValueSQL = `INSERT INTO channels (title, user_id) VALUES ("${channelTitle}","${userId}")`;
            db.query(insertValueSQL, function(err,result,fields){
                if (err) {
                    console.log(err)
                    return res.status(400).end();
                }
                
                console.log("채널 생성에 성공했습니다.")
                res.status(201).json({
                    message: `${channelTitle}님 채널을 응원합니다.`
                })
            });
            // } else{
            //     console.log("채널 생성에 실패했습니다.")
            //     res.status(400).json({
            //         message: `요청 값을 제대로 보내주세요.`
            //     })
            // }
    })

    // 채널 전체 조회
    .get([
        body('userId').notEmpty().isInt().withMessage('숫자 입력필요!'),
        validate
        ]
        ,(req,res) =>{
        let {userId} = req.body
        if(!userId) return notFoundChannels(res);
        // db.forEach((value)=>{
        //     if (value.userId === userId) channels.push(value)
        // })
            
        let selChannelSQL = `SELECT * FROM channels WHERE user_id=${userId}`;
        db.query(selChannelSQL, function(err, result, fields){
            if (err){
                console.log(err)
                return res.status(400).end();
            }
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
    .put([
        param('id').notEmpty().withMessage('숫자 입력필요!'),
        body('channelTitle').notEmpty().isString().withMessage('문자 입력필요!'),
        validate    
    ]
        ,(req,res) =>{
        // isExist(req.body.channeltitle, res);
        let {id} = req.params;
        id = parseInt(id);
        // let channel = db.get(id);

        const newTitle = req.body.channelTitle
        if (newTitle.length < 1) return res.status(401).json({
            message: "1자 이상 작성해주세요"
        })

        let insertValueSQL = `UPDATE channels SET title="${newTitle}" WHERE id=${id}`;
        db.query(insertValueSQL, function(err,result,fields){
            if (err) {
                console.log(err)
                return res.status(400).end();
            }
            
            if (result && result.affectedRows == 0){
                return res.status(400).end()
            }else {
                console.log("채널 수정에 성공했습니다.")
                res.status(201).json({
                    message: `성공적으로 채널명을 수정했습니다.`
                })
            }
        });
    })

    // 채널 개별 삭제
    .delete([
        param('id').notEmpty().withMessage('채널id 필요'),
        validate
    ]
    ,(req,res) =>{

        let {id} = req.params;
        id = parseInt(id);

        let delChannelSQL = `DELETE FROM channels WHERE id = '${id}'`;
        db.query(delChannelSQL, function(err, result, fields){
            if (err){
                console.log(err)
                return res.status(400).end();
            }

            if (result && result.affectedRows == 0){
                return res.status(400).end()
            }else {
                console.log("채널 삭제에 성공했습니다.")
                res.status(201).json({
                    message: `성공적으로 채널명을 삭제했습니다.`
                })
            }
        })
    })
    // 채널 개별 조회
    .get([
        param('id').notEmpty().withMessage('숫자 입력필요!'),
        validate
    ]
    ,(req,res) =>{
        let {id} = req.params;
        id = parseInt(id);
        // db.forEach((value)=>{
        //     if (value.userId === userId) channels.push(value)
        // })
            
        let selChannelSQL = `SELECT * FROM channels WHERE id=${id}`;
        db.query(selChannelSQL, function(err, result, fields){
            if (err){
                console.log(err)
                return res.status(400).end();
            }

            console.log(`${id}채널 불러오기 성공`)
            res.status(200).json(result)
        })
    })

function notFoundChannels(res){
    res.status(400).json({
        message: "채널 정보를 찾을 수 없습니다."
    })
}

module.exports = router