const express = require("express")
const app = express()

app.use(express.json())

app.listen(7777)

const userRouter = require('./routes/user-demo.js')
const channelRouter = require('./routes/channel-demo.js')

app.use("/", userRouter)
app.use("/channels", channelRouter)

// app.all("*", (req,res)=>{
//     res.status(404).json({ message: "올바른 URL을 입력해주세요."});
// });