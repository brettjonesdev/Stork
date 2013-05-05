var _ = require("underscore");
var events = require("events");
var mongoose = require('mongoose');
var Status = require("../models/Status");
var Comment = require("../models/Comment");

exports.getNewsItems = function(req, res) {
    var babyCode= req.query.babyCode;
    var statusQuery = Status.find({babyCode:babyCode});
    var statusPromise = statusQuery.exec();

    statusPromise.addErrback( function(err) {
        res.json(500, err.message);
    });
    statusPromise.addCallback(function(docs){
        console.log("Status query complete", docs);
        if (req.comments) {
            sendMashedUpResponse(req,res,docs,req.comments);
        } else {
            req.statuses=docs;
        }
    });

    var commentsQuery = Comment.find({babyCode:babyCode});
    var commentsPromise = commentsQuery.exec();
    commentsPromise.addErrback( function(err) {
        res.json(500, err.message);
    });
    commentsPromise.addCallback(function(docs){
        console.log("Comments query complete", docs);
        if (req.statuses) {
            sendMashedUpResponse(req,res,req.statuses,docs);
        } else {
            req.comments=docs;
        }
    });



};

function sendMashedUpResponse(req,res,statuses,comments) {
    //TODO test this
    console.log("Here I am");
    var items = [];
    _.each(statuses,function(status) {
        addStatusToCollection(status, items);
    });
    _.each(comments,function(comment) {
        addCommentToCollection(comment, items);
    });

    items.sort( function(a,b) {
        console.log(a,b);
        return 1;
    });
    res.json(items);
}

function addStatusToCollection(status, array) {
    var statusItem = _.extend({}, status);
    statusItem.status = true;
    statusItem.comment = false;
    array.push(statusItem);
}

function addCommentToCollection(comment, array) {
    var commentItem = _.extend({}, comment);
    commentItem.status = false;
    commentItem.comment = true;
    array.push(commentItem);
}

exports.updateStatus = function(req,res) {
    var data = req.body;
    var status = new Status(data);
    status.save(function(err, doc) {
        console.log("saving status",doc);
        if (err) {
            res.json(500, err.message);
        } else {
            res.json(doc.toJSON());
        }
    });
};
