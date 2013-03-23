// DEPENDENCIES
// ============
var express = require("express"),
    http = require("http"),
    port = (process.env.VMC_APP_PORT || 3000),
    host = (process.env.VCAP_APP_HOST || 'localhost'),
    server = module.exports = express(),
    requests = require('./routes/rsvpRequests');
    baby = require('./routes/baby');

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

server.get("/helloWorld", function(req,res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World\n');
});

server.post( "/makeRequest", requests.makeRequest );
server.get("/babyInfo/:id", baby.getInfo);
server.get("/statusFeed", baby.getStatusFeed);
server.get("/comments", baby.getComments);

console.log('App started on ' + host + ':' + port);
