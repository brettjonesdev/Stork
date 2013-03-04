define(['marionette', 'controllers/Controller'], function (Marionette, Controller) {
    return Marionette.AppRouter.extend({
        //"index" must be a method in AppRouter's controller
        appRoutes:{
            "thankYouForRequest":"thankYouForRequest",
            //Note: "" is a catch-all route which must go last or it will preempt all other routes!
            "makeRequest/:id":"makeRequest",
            "" : "welcome"
        }
    });
});