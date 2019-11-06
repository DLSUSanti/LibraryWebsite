const mongoose = require("mongoose")

var shelfSchema = mongoose.Schema({
    shelf_number: Number,
    location: String,
    section: String,
    subject_codes: Array,
    subject_names: Array,
    picture_location: String
})

var userSchema = mongoose.Schema({
    username: String,
    password: String
})

var Shelve = mongoose.model("shelve", shelfSchema)
var User = mongoose.model("user", userSchema)

module.exports = {
    Shelve, User
}