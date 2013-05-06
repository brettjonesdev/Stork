var requests = require('../routes/rsvpRequests');
var baby = require('../routes/babies');
var users = require('../routes/users');
var passport = require("passport");
var news = require("../routes/news");

module.exports = function (app) {
    console.log("configuring routes");
    //User
    app.post("/user", users.create);
    app.post("/tempAuth", users.authorize);
    app.post("/baby", users.requireAuthentication, baby.createBaby);
    app.put("/baby/:id", users.requireAuthentication, baby.updateBaby);
    app.post("/status", users.requireAuthentication, news.updateStatus);

    app.post("/logIn", users.logInUser);
    app.post("/logOut", users.logOutUser);
    app.get("/userInfo", users.requireAuthentication, users.getUserInfo);

    //Open
    app.post("/makeRequest", requests.makeRequest);
    app.get("/baby/:id", baby.getInfo);
    app.get("/babyByCode/:code", baby.getByBabyCode);
    app.get("/babyByUserId/:id", baby.getByUserId);
    app.get("/statusFeed", baby.getStatusFeed);
    app.get("/comments", baby.getComments);
    app.post("/comment", news.leaveComment);
    app.get("/newsItems", news.getNewsItems);

    console.log("routes configured");
};