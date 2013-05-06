define(['App', 'marionette', 'controllers/SecureController'],
    function (App, Marionette, SecureController) {
    return Marionette.AppRouter.extend({
        controller: new SecureController(),
        //Routes for authenticated user
        appRoutes:{
            "editPage":"editPage",
            "home":"home",
            "user/preview":"preview",
            "user/editInfo":"editInfo",
            "user/availability":"availability",
            "user/viewRequests":"viewRequests",
            "user/help":"help",
            "user/photos":"photos",
            "user/settings":"settings",
            "user/addUser":"addUser",
            "user/social":"social"
        },

        initialize: function() {
            //todo doing this manually now to allow cancelling of routing.
            // this.on("all", this.controller.checkAuthenticated);
        }
    });
});