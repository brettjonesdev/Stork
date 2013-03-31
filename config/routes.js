var requests = require('../routes/rsvpRequests');
var baby = require('../routes/babies');
var users = require('../routes/users');


module.exports = function (app) {
    console.log("configuring routes");
    //User
    app.post("/user", users.create);
    app.post("/tempAuth", users.authorize);
    app.post("/baby", baby.createBaby);

    //Open
    app.post("/makeRequest", requests.makeRequest);
    app.get("/baby/:id", baby.getInfo);
    app.get("/babyByCode/:code", baby.getByBabyCode);
    app.get("/babyByUserId/:code", baby.getByUserId);
    app.get("/statusFeed", baby.getStatusFeed);
    app.get("/comments", baby.getComments);
    console.log("routes configured");
};