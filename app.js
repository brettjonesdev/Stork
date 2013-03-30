// DEPENDENCIES
// ============
var express = require("express");
var http = require("http");
var port = (process.env.VMC_APP_PORT || 3000);
var host = (process.env.VCAP_APP_HOST || 'localhost');
var mongo = require("./config/mongo");
var mongoStore = require('connect-mongo')(express);
var passport = require("passport");

require('./config/passport')(passport);

var app = module.exports = express();

app.configure(function () {
    app.use(express["static"](__dirname + "/public"));

    app.use(express.errorHandler({
        dumpExceptions:true,
        showStack:true
    }));

    // cookieParser should be above session
    app.use(express.cookieParser());

    // express/mongo session storage
    app.use(express.session({
        secret: 'noobjs',
        store: new mongoStore({
            url: mongo.mongoUrl,
            collection : 'sessions'
        })
    }));

    app.use(express.bodyParser());
    app.use(express.methodOverride());

    app.use(passport.initialize());
    app.use(passport.session());

    //must go last
    app.use(app.router);
});

require('./config/routes')(app);

// Start Node.js Server
http.createServer(app).listen(port, host);

console.log('server started on ' + host + ':' + port);
