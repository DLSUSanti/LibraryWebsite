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
    useNewUrlParser: true,
    useUnifiedTopology: true
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

app.post("/login", urlencoder, (req, res)=>{
    let username = req.body.username;
    let password = req.body.password;
    
    if(username != "admin" || password != "libraryadmin")
        res.render("login.hbs", {
            invalid_credentials: "Invalid username or password!"
        })
    
    else{
        res.render("admin.hbs")
    }
})

app.post("/logout", (req, res)=>{
    res.render("login.hbs")
})

app.post("/admin", (req, res)=>{
    res.render("login.hbs")
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
    var num = parseInt(query)
    if(Number.isNaN(num)){
       num = -1
    }
    console.log(exp)
    console.log(num)
    
    Shelve.find({$or:[{subject_names: exp}, {subject_codes: exp}, {location: exp}, {section: exp}, {shelf_number: num}]}).exec(function(err,results){
        res.send(results);
    })
})

app.get("/SearchShelfAdv/:advancedquery/:advancedquery2/:advancedquery3/:boolean1/:boolean2", urlencoder, (req,res)=>{
    console.log("searching")
    var query = req.params.advancedquery
    var query2 = req.params.advancedquery2
    var query3 = req.params.advancedquery3
    var boolean1 = req.params.boolean1
    var boolean2 = req.params.boolean2
    console.log(boolean1)
    console.log(boolean2)
    var exp = new RegExp(query, 'i')
    var exp2 = new RegExp(query2, 'i')
    var exp3 = new RegExp(query3, 'i')
    console.log(exp)
    console.log(exp2)
    console.log(exp3)
    
    if(boolean1 == 'and' && boolean2 == 'and'){
        Shelve.find({$and:[{location: exp}, {subject_names: exp2}, {section: exp3}]}).exec(function(err,results){
            res.send(results);
        })
    }
    if(boolean1 == 'or' && boolean2 == 'or'){
        Shelve.find({$or:[{location: exp}, {subject_names: exp2}, {section: exp3}]}).exec(function(err,results){
            res.send(results);
        })
    }
    if(boolean1 == 'and' && boolean2 == 'or'){
        Shelve.find({$or:[{$and:[{location: exp}, {subject_names: exp2}]}, {section: exp3}]}).exec(function(err,results){
            res.send(results);
        })
    }
    if(boolean1 == 'or' && boolean2 == 'and'){
        Shelve.find({$or:[{location: exp}, {$and:[{subject_names: exp2}, {section: exp3}]}]}).exec(function(err,results){
            res.send(results);
        })
    }
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