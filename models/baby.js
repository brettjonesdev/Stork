var mongoose = require("mongoose");

var BabySchema = new mongoose.Schema({
    email: String,
    password: String,
    babyCode:String,
    fatherFirst: String,
    fatherLast: String,
    motherFirst: String,
    motherLast: String,
    babyFirst: String,
    babyMiddle: String,
    babyLast: String
});

var Baby = mongoose.model("Baby", BabySchema);