const express = require("express")
const session = require("express-session")
const bodyparser = require("body-parser")
const hbs = require("hbs")
const url = require("url")

const mongoose = require("mongoose")
const connectionString = "mongodb+srv://admin:admin@librarylocator-nqyws.gcp.mongodb.net/librarylocator?retryWrites=true&w=majority"

const app = express()
const urlencoder = bodyparser.urlencoded({
    extended : false
})

mongoose.Promise = global.Promise
mongoose.connect(connectionString, {
    useNewUrlParser: true
})

app.use(express.static(__dirname + "/public"))
const Shelve = require("./models/database.js").Shelve

app.get("/", (req,res)=>{
     Shelve.find({location:"7th floor Mezzanine"}).exec(function(err,shelves){
        res.render("home.hbs",{
            location: "7th Floor Mezzanine",
            data: shelves
        })
    })
})

app.post("/floorChange", (req,res)=>{
    var floor = req.body.fl
    Shelve.find({location:floor}).exec(function(err,shelves){
        res.render("home.hbs",{
            location: req.body.fl,
            data: shelves
        })
    })
})

app.set('port', (process.env.PORT || 3000))

app.listen(app.get('port'), ()=>{
    console.log("server live")
})

/*SYNTAX FOR FINDING*/
/*
Shelve.find({shelf_number:25}, function(err, docs){
    if(err){
        res.send(err)
    }
    else{
        console.log(docs)
    }
})
*/
