var mongoose = require('mongoose');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/User');


module.exports = function (passport, config) {
    console.log("configuring passport");

    // serialize sessions
    passport.serializeUser(function(user, done) {
        done(null, user.id)
    });

    passport.deserializeUser(function(id, done) {
        User.findOne({ _id: id }, function (err, user) {
            done(err, user)
        });
    });

    // use local strategy
    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        },
        function(email, password, done) {
            User.findOne({ email: email }, function (err, user) {
                if (err) { return done(err) }
                if (!user) {
                    return done(null, false, { message: 'Unknown user' })
                }
                if (!user.authenticate(password)) {
                    return done(null, false, { message: 'Invalid password' })
                }
                return done(null, user)
            });
        }
    ));
};