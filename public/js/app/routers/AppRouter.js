define(['marionette', 'controllers/Controller'], function (Marionette, Controller) {
    return Marionette.AppRouter.extend({
        //"index" must be a method in AppRouter's controller
        appRoutes:{
            "thankYouForRequest":"thankYouForRequest",
            "babyPage/(:id)":"babyPage",
            "makeRequest/(:id)":"makeRequest",
            "create": "create",
            "checkYourEmail":"checkYourEmail",
            "verify/:code":"verify",

            //Note: "" is a catch-all route which must go last or it will preempt all other routes!
            "" : "welcome"
        }
    });
});