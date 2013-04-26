var mongoose = require("mongoose");

var mongoConfig = {
    "hostname":"localhost",
    "port":27017,
    "username":"",
    "password":"",
    "db":"dev"
};

if ( process.env.MONGO_HOST ) {
   mongoConfig = {
       "hostname": process.env.MONGO_HOST,
       "port":process.env.MONGO_PORT,
       "username":process.env.MONGO_USER,
       "password":process.env.MONGO_PASSWORD,
       "db":process.env.MONGO_DATABASE
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