//var dao = require('../data/dao');
var Baby = require("../models/Baby");
var db = require("../data/mongo");

exports.getInfo = function (req, res) {
    var babyId = req.params.id;
    console.log(babyId);

    var shim = {
        _id: "abc123",
        babyFirst: "Carter",
        babyMiddle: "Chatman",
        babyLast: "Jones",
        gender: "male",
        fatherFirst: "Brett",
        fatherLast: "Jones",
        motherFirst: "Kimberley",
        motherLast: "Jones",
        birthDate: "February 24, 2013",
        weight: "7 lbs, 11 oz",
        height: "19 in"
    };

    res.json(shim);
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