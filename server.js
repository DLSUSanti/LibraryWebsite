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

app.listen(3000, ()=>{
    console.log("live at port 3000")
})