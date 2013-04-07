var mongoose = require('mongoose');
var crypto = require('crypto');
var ObjectID = require('mongodb').ObjectID;

var UserSchema = new mongoose.Schema({
    email: { type:String, unique: true },

    active: Boolean,
    tempAuthCode: String,
    hashedPassword: String
});

 UserSchema.virtual('password')
 .set(function(password) {
 this._password = password;
 this.salt = this.makeSalt();
 this.hashed_password = this.encryptPassword(password)
 })
 .get(function() { return this._password });


//instance methods
UserSchema.methods = {
    authenticateOnceWithCode: function(code) {
        return ( code === this.tempAuthCode );
    },

    authenticate: function(plainText) {
        return (( this.encryptPassword(plainText) === this.hashed_password) && this.active);
    },

    makeSalt: function() {
        return Math.round((new Date().valueOf() * Math.random())) + '';
    },

    encryptPassword: function(password) {
        if (!password) return '';
        return crypto.createHmac('sha1', this.salt).update(password).digest('hex')
    }
};

//static methods
UserSchema.statics.generateTempAuthCode = function() {
    var code = new ObjectID();
    return code.toString();
};

var User = mongoose.model("User", UserSchema);

module.exports = User;