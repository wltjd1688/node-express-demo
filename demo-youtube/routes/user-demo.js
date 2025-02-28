const express = require("express")
const router = express.Router()

const db = require('../mariadb')
// let db = new Map();

// 로그인
router.post("/login", (req, res)=>{
    try{
        isExist(req.body, res);
        const {email, password} = req.body;
        // let userInfo = {};

        if (!email) return res.status(400).json({message: "아이디를 입력해주세요"})
        if (!password) return res.status(400).json({message: "비밀번호를 입력해주세요"})
        
        // db.forEach((value,key)=>{
        //     if (key===email) return userInfo = value;
        // })
        // isExist(userInfo,res,"없는 아이디 입니다");

        let selEmailSQL = `SELECT * FROM Users WHERE email = "${email}"`;
        db.query(selEmailSQL, function(err, results, fields){
                if (results && results[0].password === password){
                    console.log("로그인에 성공하였습니다.")
                    res.status(200).json({message: `${userInfo.name}님 환영합니다.`})
                } else {
                    console.log(err)
                    res.status(400).json({message: "아이디 또는 비밀번호가 틀렸습니다."})
                }
            }
        )

        // 메인 페이지로 이동
    } catch {
        res.status(500).json({message: "서버와의 연결에 실패하였습니다."})
    }
    
})

// 회원가입
router.post("/join", (req, res)=>{
    try {
        isExist(req.body, res);
        const {email, password, name, phone} = req.body;

        if (!email) return res.status(400).json({message: "아이디를 입력해주세요"});
        if (!password) return res.status(400).json({message: "비밀번호를 입력해주세요"});
        if (!name) return res.status(400).json({message: "이름을 입력해주세요"});
        
        // db.forEach((value)=>{
        //     if (value.email===userInfo.email) return res.status(401).json({message: "이미 사용중인 아이디 입니다. 다시 입력해주세요"})
        // })

        // db.set(email, userInfo)

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
                                res.status(404).json({message: "회원가입에 실패하였습니다."})
                            } else {
                                console.log("회원가입에 성공하였습니다.")
                                res.status(200).json({message: `${name}님 회원가입을 환영합니다.`})
                            }
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
    .get((req,res)=>{
        try{
            let {email} = req.body;

            // const userInfo = db.get(email);
            let selEmailSQL = `SELECT * FROM Users WHERE email = "${email}"`;
            db.query(selEmailSQL, function (err, results, fields) {
                    if (results){
                        const userInfo = { 
                            email: email,
                            name: results[0].name,
                            phone: results[0].phone,
                            created_at: results[0].created_at
                        }
                        res.status(200).json();
                    } else {
                        res.status(404).json({ message: "회원 정보가 업습니다."});
                        console.log(err);
                    }
                }
            );
        } catch {
            res.status(500).json({message: "서버 연결에 실패했습니다."})
        };
    })
    .delete((req,res)=>{
        try {
            let {email} = req.body;
            let name = "";

            let selEmailSQL = `SELECT * FROM Users WHERE email = '${email}'`;
            let delEmailSQL = `DELETE FROM Users WHERE email = '${email}'`;
            db.query(selEmailSQL, function(err, results, fileds){
                    if (results){
                        name = results[0].name;
                        db.query(delEmailSQL, function(err, results, fields){
                                if (!err){
                                    console.log(`${name} 삭제성공`);
                                    res.status(200).json({ message: `${name}님 다음에 또 뵙겠습니다.`});
                                } else {
                                    console.log(err);
                                    res.status(404).json({ message: "삭제에 실패하였습니다."});
                                }
                            }
                        )
                    } else {
                        res.status(404).json({ message: "회원 정보가 업습니다."});
                        console.log(err);
                    }
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