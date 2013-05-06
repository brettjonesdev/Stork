var mongoose = require("mongoose");
var Schema  = mongoose.Schema;
var mongooseTypes = require("mongoose-3x-types");
var useTimestamps = mongooseTypes.useTimestamps;

var CommentSchema = new Schema({
    babyCode:{ type:String, required: true },
    message: { type:String, required:true},
    from: {type:String, required: true},
    fromEmail: {type:Schema.Types.Email, required: true}
});

CommentSchema.plugin(useTimestamps);

CommentSchema.index({babyCode: 1, createdAt: -1});

var Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;