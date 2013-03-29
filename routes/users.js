var User = require("../models/User");

exports.create = function(req,res) {
    console.log("users.create");

    var userInfo = req.body;
    console.log("userInfo",userInfo);

    var user = new User(userInfo);
    user.provider = 'local';

    user.save(function (err, obj) {
        if (err) {
            res.json(500, err.message);
        } else {
            console.log(obj);
            res.json({success: true, object: obj});
        }
    });
};

