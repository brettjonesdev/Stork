// DEPENDENCIES
// ============
var express = require("express");
var http = require("http");
var port = (process.env.VMC_APP_PORT || 3000);
var host = (process.env.VCAP_APP_HOST || 'localhost');
var server = module.exports = express();
var requests = require('./routes/rsvpRequests');
var baby = require('./routes/baby');
var user = require('./routes/user');
var db = require("./data/mongo");


// SERVER CONFIGURATION
// ====================
server.configure(function () {
    server.use(express["static"](__dirname + "/public"));

    server.use(express.errorHandler({
        dumpExceptions:true,
        showStack:true
    }));
    server.use(express.bodyParser());
    server.use(express.methodOverride());

    server.use(server.router);
});

// SERVER
// ======

// Start Node.js Server
http.createServer(server).listen(port, host);

server.post("/create", user.addUser);

server.post("/makeRequest", requests.makeRequest);
server.get("/babyInfo/:id", baby.getInfo);
server.get("/statusFeed", baby.getStatusFeed);
server.get("/comments", baby.getComments);

console.log('App started on ' + host + ':' + port);
