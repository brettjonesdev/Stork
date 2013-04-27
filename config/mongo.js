var mongoose = require("mongoose");

var mongoUrl = process.env.MONGO_URL;
if ( !mongoUrl ) {
    mongoUrl = "mongodb://localhost:27017/dev";
}

console.log("connecting:", mongoUrl);

mongoose.connect(mongoUrl);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log( "Connected to database:" + mongoUrl );
});

exports.db = db;
exports.mongoUrl = mongoUrl;