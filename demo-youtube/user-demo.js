const express = require("express")
const app = express()

app.listen(7777)

app.use(express.json())

app.all("*", (req,res)=>{
    res.status(404).json({ message: "올바른 URL을 입력해주세요."});
});

// 로그인
app.post("/login", (req, res)=>{
    try{
        if (Object.keys(req.body) == 0) return res.status(401).json({ message: "입력한 값을 확인해주세요"})
        const id = req.body.id;
        const pw = req.body.pw;

        if (!id) res.status(401).json({message: "아이디를 입력해주세요"})
        if (!pw) res.status(401).json({message: "비밀번호를 입력해주세요"})

        let userInfo = db.get(id);
        if (userInfo){
            if (userInfo.pw === pw){
                res.status(200).json({message: `${userInfo.name}님 환영합니다.`})
                // 메인페이지로 이동
            }
        } else {
            res.status(401).json({message: "없는 아이디 입니다"})
        }
    } catch {
        res.status(500).json({message: "서버와의 연결에 실패하였습니다."})
    }
    
})

// 회원가입
app.post("/join", (req, res)=>{
    try {
        if (Object.keys(req.body) == 0) return res.status(401).json({ message: "입력한 값을 확인해주세요"})
        const id = req.body.id;
        const userInfo = {
            pw : req.body.pw,
            name : req.body.name
        }

        if (!id) return res.status(401).json({message: "아이디를 입력해주세요"})
        if (!userInfo.pw) return res.status(401).json({message: "비밀번호를 입력해주세요"})
        if (!userInfo.name) return res.status(401).json({message: "이름을 입력해주세요"})

        if (db.has(id)){
            return res.status(401).json({message: "이미 사용중인 아이디 입니다. 다시 입력해주세요"})
        } else {
            db.set(id, userInfo)
            return res.status(200).json({message: `${userInfo.name}님 회원가입을 환영합니다.`})
            // 로그인 페이지로 이동
        }
    } catch {
        res.status(500).json({message: "서버 연결에 실패했습니다."})
    }
})

app.route('/users/:id')
    .get((req,res)=>{
        try{
            const id = req.params.id;
            console.log(id);

            const userInfo = db.get(id);
            if (userInfo){
                const resUserInfo = {
                    id : id,
                    name : userInfo.name
                }
                res.json(resUserInfo)
            } else {
                res.status(404).json({ message: "회원 정보가 업습니다."})
            }
        } catch {
            res.status(500).json({message: "서버 연결에 실패했습니다."})
        }
    })
    .delete((req,res)=>{
        try {
            const id = req.params.id;
                
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

let db = new Map();
