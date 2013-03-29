// DEPENDENCIES
// ============
var express = require("express");
var http = require("http");
var port = (process.env.VMC_APP_PORT || 3000);
var host = (process.env.VCAP_APP_HOST || 'localhost');
var db = require("./config/mongo");
var passport = require("passport");

require('./config/passport')(passport);

var app = module.exports = express();

app.configure(function () {
    app.use(express["static"](__dirname + "/public"));

    app.use(express.errorHandler({
        dumpExceptions:true,
        showStack:true
    }));
    app.use(express.bodyParser());
    app.use(express.methodOverride());

    app.use(app.router);

    app.use(passport.initialize());
    app.use(passport.session());
});

require('./config/routes')(app);

// Start Node.js Server
http.createServer(app).listen(port, host);

console.log('server started on ' + host + ':' + port);
