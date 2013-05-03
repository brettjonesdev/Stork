define(['App', 'marionette', 'controllers/SecureController'],
    function (App, Marionette, SecureController) {
    return Marionette.AppRouter.extend({
        controller: new SecureController(),
        //Routes for authenticated user
        appRoutes:{
            "editPage":"editPage",
            "home":"home"
        },

        initialize: function() {
            //todo doing this manually now to allow cancelling of routing.
            // this.on("all", this.controller.checkAuthenticated);
        }
    });
});