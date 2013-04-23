var User = require("../models/User");
var Baby = require("../models/Baby");
var email = require("../util/email");
var passport = require("passport");

exports.requireAuthentication = function (req, res, next) {
    if (!req.user) {
        res.json(401, "Not logged in");
    } else {
        //authenticated, pass along to next handler
        next();
    }
};

exports.getBlah = function(req,res) {
    console.log("blah", req.user);
    res.json(req.user);
};

exports.authorize = function (req, res) {
    console.log("users.authorize", req.body);
    var code = req.body.tempAuthCode;

    User.findOne({tempAuthCode:code}, function (err, document) {
        if (err) {
            res.json(500, err);
        }
        else if (!document) {
            res.json(500, "Unable to find User with this tempAuthCode")
        }
        else {
            document.tempAuthCode = undefined;
            document.active = true;
            document.save(function(err,doc) {
                if ( err ) {
                    res.json(500,err);
                } else {
                    req.login(doc, function(err) {
                        if (err) {
                            res.json(401, "Not authorized");
                        } else {
                            res.json(doc.toJSON());
                        }
                    });


                }
            });
        }
    });
};

exports.logOutUser =  function(req, res){
    req.logout();
    res.json();
};

exports.getUserInfo = function(req,res) {
    User.findOne({_id: req.user._id}, function(err,userDoc) {
        if ( err ) {
            res.json(500, err);
        } else {
            var userInfo = userDoc.toJSON();
            returnUserBabyInfo(req,res,userInfo);
        }
    });
};

exports.logInUser = function(req, res) {
    var query = {
        email: req.body.email
    };
    User.findOne(query, function(err, document) {
        if (err) {
            console.log("Unable to log in user", req.body, err);
            res.json(500, "Error logging in user");
        } else {
            req.login(document, function(err) {
                if ( err ) {
                    res.json(401, "Not authorized");
                } else {
                    var userInfo = document.toJSON();
                    returnUserBabyInfo(req,res,userInfo);
                }
            });
        }
    });
};

function returnUserBabyInfo(req,res,userInfo) {
    Baby.findOne({userId: userInfo._id}, function(err, doc) {
        if (err) {
            console.log(err);
            //No baby info found for user yet - not necessarily an error
        } else if ( doc ) {
            //Assign baby info to userInfo.baby
            userInfo.baby = doc.toJSON();
        }
        res.json(userInfo);
    });
}

exports.create = function(req,res) {
    console.log("users.create");

    var userInfo = req.body;
    console.log("userInfo",userInfo);
    userInfo.active = false;
    var tempAuthCode = User.generateTempAuthCode();
    userInfo.tempAuthCode = tempAuthCode;

    var user = new User(userInfo);
    user.provider = 'local';

    user.save(function (err, obj) {
        if (err) {
            res.json(500, err.message);
        } else {
            console.log(obj);

            email.sendEmail({
                to: user.email,
                subject: "Welcome to Baby Page!",
                body: getConfirmationEmailBody(tempAuthCode),
                callback: function(err, message) {
                    if (err) {
                        res.json(500, "Unable to send email: " + message);
                    } else {
                        res.json({success: true});
                    }
                }
            });
        }
    });
};

function getConfirmationEmailBody(tempAuthCode) {
    var host = (process.env.VCAP_APP_HOST || 'localhost');
    var port = (process.env.VMC_APP_PORT || 3000);

    return "<h2>Welcome to Baby Page!</h2>" +
        "<h4>Click on the link below to finish creating your account and begin sharing your baby with friends and family!</h4>" +
        "<br/><a href='http://" + host + (port != 80 ? ":" + port : "" ) + "#verify/" + tempAuthCode + "'>Register your account</a>";

}