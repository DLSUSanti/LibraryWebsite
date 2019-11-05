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

app.post("/7th-Floor-Mezzanine", (req,res)=>{
    Shelve.find({location:"7th floor Mezzanine"}).exec(function(err,shelves){
        res.render("home.hbs",{
            location: "7th Floor Mezzanine",
            data: shelves
        })
    })
})

app.post("/8th-Floor", (req,res)=>{
    Shelve.find({location:"8th Floor"}).exec(function(err,shelves){
        res.render("home.hbs",{
            location: "8th Floor",
            data: shelves
        })
    })
})

app.post("/8th-Floor-Mezzanine", (req,res)=>{
    Shelve.find({location:"8th Floor Mezzanine"}).exec(function(err,shelves){
        res.render("home.hbs",{
            location: "8th Floor Mezzanine",
            data: shelves
        })
    })
})

app.post("/10th-Floor-Mezzanine", (req,res)=>{
    Shelve.find({location:"10th Floor Mezzanine"}).exec(function(err,shelves){
        res.render("home.hbs",{
            location: "10th Floor Mezzanine",
            data: shelves
        })
    })
})

app.get("/SearchShelf/:basicquery", urlencoder, (req,res)=>{
    console.log("searching")
    var query = req.params.basicquery
    console.log(query)
    var exp = new RegExp(query, 'i')
    console.log(exp)
    
    Shelve.find({$or:[{subject_names: exp}, {subject_codes: exp}, {location: exp}, {section: exp}]}).exec(function(err,results){
        res.send(results);
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
