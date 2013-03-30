var User = require("../models/User");
var email = require("../util/email");
var passport = require("passport");

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
                }
                else {
                    req.login(doc, function(err) {
                        if (err) {
                            res.json(300, "Not authorized");
                        } else {
                            res.json(200, {userId:doc.get("_id")});
                        }
                    });


                }
            });
        }
    });
};

exports.create = function(req,res) {
    console.log("users.create");

    var userInfo = req.body;
    console.log("userInfo",userInfo);
    userInfo.active = false;
    var tempAuthCode = Math.round((new Date().valueOf() * Math.random())) + '';
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