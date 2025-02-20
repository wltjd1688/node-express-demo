const express = require("express")
const app = express()

app.listen(7777)

let db = new Map();
let idx = 1;

app.use(express.json())

// 로그인
app.post("/login", (req, res)=>{
    try{
        isExist(req.body, res);
        const {userId, password} = req.body;
        let userInfo = {};

        if (!userId) return res.status(400).json({message: "아이디를 입력해주세요"})
        if (!password) return res.status(400).json({message: "비밀번호를 입력해주세요"})

        db.forEach((value)=>{
            if (value.userId===userId) return userInfo = value;
        })

        isExist(userInfo,res,"없는 아이디 입니다");
        if (userInfo.password = password){
            return res.status(200).json({message: `${userInfo.name}님 환영합니다.`})
        } else {
            return res.status(401).json({message: "비밀번호가 틀렸습니다."})
        }
        // 메인 페이지로 이동
    } catch {
        res.status(500).json({message: "서버와의 연결에 실패하였습니다."})
    }
    
})

// 회원가입
app.post("/join", (req, res)=>{
    try {
        isExist(req.body, res);
        const id = idx++;
        const userInfo = {
            userId: req.body.userId,
            password: req.body.password,
            name : req.body.name
        }

        if (!userInfo.userId) return res.status(400).json({message: "아이디를 입력해주세요"})
        if (!userInfo.password) return res.status(400).json({message: "비밀번호를 입력해주세요"})
        if (!userInfo.name) return res.status(400).json({message: "이름을 입력해주세요"})
        
        db.forEach((value)=>{
            if (value.userId===userInfo.userId) return res.status(401).json({message: "이미 사용중인 아이디 입니다. 다시 입력해주세요"})
        })

        db.set(id, userInfo)
        return res.status(200).json({message: `${userInfo.name}님 회원가입을 환영합니다.`})
        // 로그인 페이지로 이동
    } catch {
        res.status(500).json({message: "서버 연결에 실패했습니다."})
    }
})

app.route('/users/:id')
    .get((req,res)=>{
        try{
            let id = req.params.id;
            id = parseInt(id)

            const userInfo = db.get(id);
            if (userInfo){
                res.status(200).json({ 
                    userId: userInfo.userId,
                    name: userInfo.name
                })
            } else {
                res.status(404).json({ message: "회원 정보가 업습니다."})
            }
        } catch {
            res.status(500).json({message: "서버 연결에 실패했습니다."})
        }
    })
    .delete((req,res)=>{
        try {
            let id = req.params.id;
            id = parseInt(id)
                
            const userInfo = db.get(id);
            if (userInfo){
                const beName = userInfo.name;
                db.delete(id)
                res.status(200).json({message: `${beName}님 다음에 또 뵙겠습니다.`})
            } else {
                res.status(404).json({ message: "회원 정보가 업습니다."})
            }
        } catch {
            res.status(500).json({message: "서버 연결에 실패했습니다."})
        }
    })

app.all("*", (req,res)=>{
    res.status(404).json({ message: "올바른 URL을 입력해주세요."});
});

function isExist(obj, response, text="입력한 값을 확인해주세요"){
    if (Object.keys(obj).length == 0) {
        return response.status(400).json({ message: text})
    }
};