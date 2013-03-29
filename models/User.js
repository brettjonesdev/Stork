var mongoose = require('mongoose');
var crypto = require('crypto');

var UserSchema = new mongoose.Schema({
    email: { type:String, unique: true },
    babyCode:{ type:String, unique: true },
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

UserSchema.methods = {
    authenticateOnceWithCode: function(code) {
        if ( code === this.tempAuthCode ) {
            this.set("tempAuthCode", undefined );
            this.set("active", true);
            return true;
        }
        return false;
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

var User = mongoose.model("User", UserSchema);
module.exports = User;