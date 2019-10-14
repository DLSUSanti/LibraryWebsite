const express = require("express")
const session = require("express-session")
const bodyparser = require("body-parser")
const hbs = require("hbs")
const url = require("url")

const app = express()
const urlencoder = bodyparser.urlencoded({
    extended : false
})

app.get("/", (req,res)=>{
    res.render("home.hbs")
})

app.set('port', (process.env.PORT || 3000))

app.listen(app.get('port'), ()=>{
    console.log("server live")
})