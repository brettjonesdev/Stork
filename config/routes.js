var requests = require('../routes/rsvpRequests');
var baby = require('../routes/babies');
var users = require('../routes/users');


module.exports = function (app) {
    console.log("configuring routes");
    //User
    app.post("/create", users.create);

    //Open
    app.post("/makeRequest", requests.makeRequest);
    app.get("/baby/:id", baby.getInfo);
    app.get("/statusFeed", baby.getStatusFeed);
    app.get("/comments", baby.getComments);
    console.log("routes configured");
};