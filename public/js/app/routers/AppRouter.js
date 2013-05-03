define(['marionette', 'controllers/Controller'], function (Marionette, Controller) {
    return Marionette.AppRouter.extend({
        controller: new Controller(),

        appRoutes:{
            "thankYouForRequest":"thankYouForRequest",
            "babyPage/(:id)":"babyPage",
            "makeRequest/(:id)":"makeRequest",
            "create": "create",
            "checkYourEmail":"checkYourEmail",
            "verify/:code":"verify",
            "logIn":"logIn",
            "logOut":"logOut",

            //catch-all route which *must go last* or it will preempt all other routes!
            "" : "welcome"
        }
    });
});