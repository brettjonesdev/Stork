var mongoose = require("mongoose");
var Schema  = mongoose.Schema;
var mongooseTypes = require("mongoose-3x-types");
var useTimestamps = mongooseTypes.useTimestamps;

var StatusSchema = new Schema({
    babyCode:{ type:String, required: true },
    message: { type:String, required:true},
    milestone: Boolean,
    private: Boolean,
    sms: Boolean
});

StatusSchema.plugin(useTimestamps);

StatusSchema.index({babyCode: 1, createdAt: -1});

var Status = mongoose.model("Status", StatusSchema);

module.exports = Status;