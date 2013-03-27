var mongoose = require("mongoose");
var crypto = require('crypto');

exports.addUser = function(req,res) {
    console.log("addUser");
    res.json({success:true});
};

var UserSchema = new mongoose.Schema({
    email: { type:String, unique: true },
    password: String,
    babyCode:{ type:String, unique: true }
});

/*
UserSchema.virtual('password')
    .set(function(password) {
        this._password = password;
        this.salt = this.makeSalt();
        this.hashed_password = this.encryptPassword(password)
    })
    .get(function() { return this._password });
*/

UserSchema.methods = {
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password
    },

    makeSalt: function() {
        return Math.round((new Date().valueOf() * Math.random())) + ''
    },

    encryptPassword: function(password) {
        if (!password) return '';
        return crypto.createHmac('sha1', this.salt).update(password).digest('hex')
    }
};


mongoose.model("User", UserSchema);