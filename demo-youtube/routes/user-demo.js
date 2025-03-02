const express = require("express");
const router = express.Router();
const db = require('../mariadb');
const {body, validationResult, param} = require('express-validator');

// jwt 모듈
const jwt = require('jsonwebtoken');

// .env 모듈
const dotenv = require('dotenv');
dotenv.config();

const validate = (res,req, next) => {
    const err = validationResult(req);

    if (!err.isEmpty()){
        return res.status(400).json(err.array())
    } else {
        return next();
    }
};

// 로그인
router.post("/login",
    [
        body('email').notEmpty().isEmail().withMessage('이메일 형식 필요!'),
        body('password').notEmpty().isStrongPassword().withMessage('비밀번호 필요!'),
        validate
    ]
    ,(req, res, next)=>{
    try{
        isExist(req.body, res);
        const {email, password} = req.body;

        let selEmailSQL = `SELECT * FROM Users WHERE email = "${email}"`;
        db.query(selEmailSQL, function(err, results, fields){
            if (err){
                console.log(err);
                return res.status(400).end();
            };

            let userInfo = results[0];

            if (userInfo && userInfo.password === password){
                // token 발급
                const token = jwt.sign({
                    emila: userInfo.email,
                    name: userInfo.name
                }, process.env.PRIVATE_KEY,{
                    expiresIn : '5m',
                    issuer: "root"
                });

                res.cookie("token", token, {
                    httpOnly: true
                })

                console.log("로그인에 성공하였습니다.");
                res.status(200).json({
                    message: `${userInfo.name}님 환영합니다.`,
                });
            } else {
                console.log(err);
                res.status(403).json({message: "아이디 또는 비밀번호가 틀렸습니다."});
            };
        });
        // 메인 페이지로 이동
    } catch {
        res.status(500).json({message: "서버와의 연결에 실패하였습니다."})
    }
})

// 회원가입
router.post("/join",
    [
        body('email').notEmpty().isEmail().withMessage('이메일 형식 필요!'),
        body('password').notEmpty().isStrongPassword().withMessage('비밀번호 필요!'),
        body('name').notEmpty().isString().withMessage('이름 필요!'),
        body('phone').isString().withMessage('휴대폰 번호 형식 필요!'),
        validate
    ]
    ,(req, res)=>{
    try {
        isExist(req.body, res);
        const {email, password, name, phone} = req.body;

        let selEmailSQL = `SELECT * FROM Users WHERE email = "${email}"`;
        let insertValueSQL = `INSERT INTO Users (email, password, name, phone) VALUES ("${email}", "${password}", "${name}", "${phone}")`;
        db.query(selEmailSQL, function(err,results, fields){
                if (results && results.length > 0){
                    console.log("이미 있는 아이디입니다.")
                    res.status(404).json({message: "이미 사용중인 아이디입니다."})
                } else {
                    db.query(insertValueSQL,function(err, results, fields){
                            if (err) {
                                console.log(err)
                                return res.status(404).json({message: "회원가입에 실패하였습니다."})
                            }
                            console.log("회원가입에 성공하였습니다.")
                            res.status(200).json({message: `${name}님 회원가입을 환영합니다.`})
                        }
                    )
                }
            }
        )
        // 로그인 페이지로 이동
    } catch {
        res.status(500).json({message: "서버 연결에 실패했습니다."})
    }
})

router.route('/users')
    .get([
            body('email').notEmpty().isEmail().withMessage('이메일 형식 필요!'),
            validate
        ]
        ,(req,res)=>{
        try{
            let {email} = req.body;

            let selEmailSQL = `SELECT * FROM Users WHERE email = "${email}"`;
            db.query(selEmailSQL, function (err, results, fields) {
                    if (err){
                        console.log(err);
                        return res.status(404).json({ message: "회원 정보가 업습니다."});
                    }
                    const userInfo = { 
                        email: email,
                        name: results[0].name,
                        phone: results[0].phone,
                        created_at: results[0].created_at
                    }
                    res.status(200).json(userInfo);
                }
            );
        } catch {
            res.status(500).json({message: "서버 연결에 실패했습니다."})
        };
    })
    .delete(
        [
            body('email').notEmpty().isEmail().withMessage('이메일 형식 필요!'),
            validate
        ]
        ,(req,res)=>{
            try {
                let {email} = req.body;
                let name = "";

                let selEmailSQL = `SELECT * FROM Users WHERE email = '${email}'`;
                let delEmailSQL = `DELETE FROM Users WHERE email = '${email}'`;
                db.query(selEmailSQL, function(err, results, fileds){
                        if (err) {
                            console.log(err);
                            return res.status(404).json({ message: "회원 정보가 업습니다."});
                        } 
                        name = results[0].name;
                        db.query(delEmailSQL, function(err, results, fields){
                                if (!err){
                                    console.log(err);
                                    return res.status(404).json({ message: "삭제에 실패하였습니다."});
                                }
                                console.log(`${name} 삭제성공`);
                                res.status(200).json({ message: `${name}님 다음에 또 뵙겠습니다.`});
                            }
                        )
                    }
                )
            } catch {
                res.status(500).json({message: "서버 연결에 실패했습니다."});
            }
        })

function isExist(obj, response, text="입력한 값을 확인해주세요"){
    if (Object.keys(obj).length == 0) {
        return response.status(404).json({ message: text});
    }
};

module.exports = router;