define(['App', 'marionette', 'controllers/SecureController'],
    function (App, Marionette, SecureController) {
    return Marionette.AppRouter.extend({
        controller: new SecureController(),
        //Routes for authenticated user
        appRoutes:{
            "editPage":"editPage"
        },

        initialize: function() {
            this.on("all", this.controller.checkAuthenticated);
        }
    });
});