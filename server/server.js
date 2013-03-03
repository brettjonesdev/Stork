// DEPENDENCIES
// ============
var express = require("express"),
    http = require("http"),
    port = (process.env.PORT || 8001),
    server = module.exports = express(),
    requests = require('./routes/rsvpRequests');

// SERVER CONFIGURATION
// ====================
server.configure(function () {

    server.use(express["static"](__dirname + "/../public"));

    server.use(express.errorHandler({
        dumpExceptions:true,
        showStack:true
    }));

    server.use(server.router);
});

// SERVER
// ======

// Start Node.js Server
http.createServer(server).listen(port);

server.post( "/rsvpRequest", requests.makeRequest );

console.log('App started on port' + port);