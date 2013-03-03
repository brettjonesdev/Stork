var dao = require( '../data/dao' );
var db = dao.db;
var _ = require( 'underscore' );

exports.makeRequest = function(req, res) {
    var data = _.extend( {type: "request"}, req.body);
    console.log( "Add RSVP Request: ", data);

    db.save( data, function(err, doc) {
        if ( err ) {
            console.log(err);
            res.send(500);
        }
        else {
            console.log( "request saved: ", doc );
            res.json(doc);
        }
    });


}

