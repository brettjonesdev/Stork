var mongoose = require("mongoose");
var environment = process.env.NODE_ENV || 'dev';
var config = require('./config')[environment];

if(process.env.VCAP_SERVICES){
    var env = JSON.parse(process.env.VCAP_SERVICES);
    var mongoConfig = env['mongodb-1.8'][0]['credentials'];
}
else{
    mongoConfig = {
        "hostname":"localhost",
        "port":27017,
        "username":config.username,
        "password":config.password,
        "db":config.db
    }
}
console.log("mongoConfig", mongoConfig);

var generate_mongo_url = function(obj){
    obj.hostname = (obj.hostname || 'localhost');
    obj.port = (obj.port || 27017);
    obj.db = (obj.db || 'test');
    if(obj.username && obj.password){
        return "mongodb://" + obj.username + ":" + obj.password + "@" + obj.hostname + ":" + obj.port + "/" + obj.db;
    }
    else{
        return "mongodb://" + obj.hostname + ":" + obj.port + "/" + obj.db;
    }
};

var mongoUrl = generate_mongo_url(mongoConfig);

console.log("connecting:", mongoUrl);

mongoose.connect(mongoUrl);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log( "Connected to database:" + mongoUrl );
});

exports.db = db;
exports.mongoUrl = mongoUrl;