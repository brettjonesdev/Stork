var dao = require('../data/dao');

exports.getInfo = function (req, res) {
    var babyId = req.params.id;
    console.log(babyId);

    var shim = {
        _id: "abc123",
        first: "Carter",
        middle: "Chatman",
        last: "Jones",
        gender: "male",
        father: "Brett Chatman Jones",
        mother: "Kimberley Marie Jones",
        date: "February 24, 2013",
        weight: "7 lbs, 11 oz",
        height: "19 in"
    };

    res.json(shim);

    /*dao.get(babyId, function (err, doc) {
        if (err) {
            console.log(err);
            res.send(500);
        }
        else {
            console.log("retrieved babyInfo: ", doc);
            res.json(doc);
        }
    });*/
};

