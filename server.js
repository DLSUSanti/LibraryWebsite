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
    res.render("home.hbs")
})


app.get("/floorChange", (req,res)=>{
    var floor = req.session.shelfnumber
    Shelve.find({location:floor}, function(err, docs){
    if(err){
        res.send(err)
    }
    else{
        res.render("home.hbs",{
            data: docs
        }
    }
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
