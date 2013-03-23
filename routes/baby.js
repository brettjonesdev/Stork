//var dao = require('../data/dao');

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
        height: "19 in",
        acceptingVisits: true
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

exports.getStatusFeed = function(req,res) {
    var data = [
        {
            message:"Baby Carter is heading to the NICU for the night.  Will keep you posted!",
            time:"02/24/2013 18:56"
        },
        {
            message:"We are coming home!",
            time:"02/28/2013 04:55"
        }
    ];

    res.json(data);
};

exports.getComments = function(req,res) {
    var data = [
        {
            message:"So happy for you two!  Baby is beautiful!",
            from:"John and Mary Smith",
            time:"02/26/2013 14:56"
        },
        {
            message:"What a good looking kid!",
            from:"Grandma",
            time:"02/27/2013 08:15"
        }
    ];

    res.json(data);
};