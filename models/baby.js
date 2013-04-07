var mongoose = require("mongoose");
var Schema  = mongoose.Schema;

var BabySchema = new Schema({
    userId: {type: Schema.Types.ObjectId, required: true},
    babyCode:{ type:String, unique: true, required: true },
    parent1: {first: String, middle: String, last: String, gender: String},
    parent2: {first: String, middle: String, last: String, gender: String},
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