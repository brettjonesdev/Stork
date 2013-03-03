var cradle = require('cradle');

if (process.env.CLOUDANT_URL) {
    var db = new (cradle.Connection)(process.env.CLOUDANT_URL, 80).database('rsvp');
} else {
    db = new (cradle.Connection)('http://127.0.0.1', 5984).database('rsvp');
}

db.exists(function (err, exists) {
    if (err) {
        console.log('error', err);
    } else if (exists) {
        console.log('db rsvp exists');
    } else {
        console.log('database rsvp does not exist. Creating...');
        db.create();
        console.log('database created');
    }

    db.save('_design/request', {
        views:{
            byId:{
                map:function (doc) {
                    if (doc.type === 'request') {
                        emit(doc._id, doc);
                    }
                }
            }
        }
    });

    db.save('_design/response', {
        views:{
            byElection:{
                map:function (doc) {
                    if (doc.type === 'response') {
                        emit(doc._id, doc);
                    }
                }
            }
        }
    });
});

module.exports = db;