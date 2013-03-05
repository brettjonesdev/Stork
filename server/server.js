// DEPENDENCIES
// ============
var express = require("express"),
    http = require("http"),
    port = (process.env.PORT || 8001),
    server = module.exports = express(),
    requests = require('./routes/rsvpRequests');
    baby = require('./routes/baby');

// SERVER CONFIGURATION
// ====================
server.configure(function () {

    server.use(express["static"](__dirname + "/../public"));

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
http.createServer(server).listen(port);

server.post( "/makeRequest", requests.makeRequest );
server.get("/babyInfo/:id", baby.getInfo);
server.get("/statusFeed", baby.getStatusFeed);
server.get("/comments", baby.getComments);

console.log('App started on port' + port);