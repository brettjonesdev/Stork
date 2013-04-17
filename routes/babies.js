var _ = require("underscore");
var mongoose = require('mongoose');
var Baby = require("../models/Baby");

var shim = {
    _id: "abc123",
    userId: "abc123xyz456",
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

exports.getByBabyCode = function(req, res) {
    var babyCode= req.params.code;
    Baby.findOne({babyCode: babyCode}, function(err, doc) {
        if (err) {
            res.json(500, err.message);
        } else {
            res.json(doc);
        }
    });
};

exports.getByUserId = function(req, res) {
    var userId= req.params.id;
    Baby.findOne({userId: userId}, function(err, doc) {
        if (err) {
            res.json(500, err.message);
        } else {
            res.json(doc);
        }
    });
};

exports.getInfo = function (req, res) {
    var babyId = req.params.id;

    Baby.findOne({_id: babyId}, function(err, doc) {
        if (err) {
            res.json(500, err.message);
        } else {
            res.json(doc);
        }
    });
};

function upsertBaby(req,res) {
    var contact = new Baby(req.body);
    contact.birthDate = new mongoose.Schema.Date(req.body.birthDate);
    var upsertData = contact.toObject();

    delete upsertData._id;

    Baby.update(contact._id, upsertData, {upsert: true}, function(err, doc) {
        if (err) {
            res.json(500, err.message);
        } else {
            res.json(200, doc);
        }
    });
};


exports.updateBaby = function(req,res) {
    upsertBaby(req,res);
};

exports.createBaby = function(req,res) {
    /*var data = req.body;
    var userId = mongoose.Types.ObjectId(req.body.userId);
    data.userId = userId;

    var baby = new Baby(data);
    baby.save(function(err, doc) {
        console.log(doc);
        if (err) {
            res.json(500, err.message);
        } else {
            res.json(doc.toJSON());
        }
    });*/
    upsertBaby(req,res);
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