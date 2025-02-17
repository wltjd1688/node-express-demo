const express = require('express');
const app = express();

// 서버 셋팅 : 포트 넘버(번호) 1234로 셋팅
app.listen(1234)

// GET + "/"
app.get('/', function (req, res){
    res.send('Hello World!');
});

// localhost:1234/1 => "NoteBook"
// localhost:1234/2 => "Cup"
// localhost:1234/3 => "Chair"

app.get('/:id', function (req, res) {
    let { id } = req.params;
    id = parseInt(id); // "숫자" => 숫자

    // res.json({
    //     item: db.get(id)
    // });

    if (db.has(id)){
        let product = db.get(id);
        product.id = id; // or product[id] = id;

        res.json(
            product
        )
    } else {
        res.json({
            message: "db에 없음"
        })
    }
});

let db = new Map();

let notebook = {
    productName: "NoteBook",
    price: 2000000
}

let cup = {
    productName: "Cup",
    price: 3000
}

let chair = {
    productName: "Chair",
    price: 100000
}

let poster = {
    productName: "Poster",
    price: 5000
}

db.set(1, notebook) // 키로 밸류를 찾을 수 있는 한 쌍을 저장
db.set(2, cup)
db.set(3, chair)
db.set(4, poster)

// console.log(db);
// console.log(db.get(1)); // NoteBook
// console.log(db.has(2)); // Cup
// console.log(db.get(3)); // Chair
// console.log(db.get(4)); // Poster
