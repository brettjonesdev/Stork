var mongoose = require("mongoose");
var Schema  = mongoose.Schema;

var BabySchema = new Schema({
    userId: Schema.Types.ObjectId,
    babyCode:String,
    fatherFirst: String,
    fatherLast: String,
    motherFirst: String,
    motherLast: String,
    babyFirst: String,
    babyMiddle: String,
    babyLast: String,
    weightLb: Number,
    weightOz: Number,
    weightG: Number,
    birthDate: Date,
    birthLocation: String,
    description: String
});

var Baby = mongoose.model("Baby", BabySchema);

module.exports = Baby;