var email = require("emailjs");
var _ = require("underscore");

var server = email.server.connect({
    user: process.env.BABY_SMTP_USER,
    password: process.env.BABY_SMTP_PASSWORD,
    host:    "smtp.gmail.com",
    ssl:     true
});

exports.sendEmail = function( options ) {
    options = _.extend({
        callback: function(err,message) {
            console.log(err || message);
        }
    }, options);

    server.send( {
        text:    options.body,
        from:    "babypageapp@gmail.com",
        to:      options.to,
        subject: options.subject,
        attachment: [ {data:"<html>" + options.body + "</html>", alternative:true} ]
    }, options.callback);
};