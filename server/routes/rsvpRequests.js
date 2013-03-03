var dao = require('../data/dao');
var _ = require('underscore');

exports.makeRequest = function (req, res) {
    console.log( req.body );
    var data = _.extend({type:"request"}, req.body);
    console.log("Add RSVP Request: ", data);

    dao.save(data, function (err, doc) {
        if (err) {
            console.log(err);
            res.send(500);
        }
        else {
            console.log("request saved: ", doc);
            res.json(doc);
        }
    });
};

