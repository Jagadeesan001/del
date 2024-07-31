const express = require("express")
const mongoose = require("mongoose")
const app = express()
const cors = require("cors")
app.use(cors())
app.use(express.json())
require("dotenv").config()
mongoose.connect("mongodb://127.0.0.1:27017/clg").then(() => { console.log("Db connected success"); })
    .catch(() => console.log("Db connection Error"))
const stdlist = mongoose.model("stdlist", {
    name: String
}, "std")
app.listen(process.env.PORT, () => {
    console.log("server srarted");
})
app.get("/data", (req, res) => {
    stdlist.find().then((data) => {
        res.send(data)
    })
})
app.post("/datasent", (req, res) => {
    var ret = req.body.newvalue
    var name = new stdlist({ name: ret })
    name.save().then(() => console.log("db added..........."))
})
app.post("/delete", (req, res) => {
    var dbdel = req.body.delval
    // console.log(dbdel);
    stdlist.deleteOne({ name: dbdel }).then(()=>{console.log("db Deleted...")})
    .catch((err)=>console.log(err))
})


