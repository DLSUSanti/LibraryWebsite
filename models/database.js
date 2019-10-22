const mongoose = require("mongoose")

var shelfSchema = mongoose.Schema({
    shelf_number: Number,
    location: String,
    section: String,
    subject_codes: Array,
    subject_names: Array,
    picture_location: String
})

var Shelve = mongoose.model("shelve", shelfSchema)

module.exports = {
    Shelve
}