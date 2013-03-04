define(['App', 'backbone', 'marionette', 'views/BabyPageView', 'views/MakeRequestView', 'views/HeaderView', 'views/ThankYouForRequestView', 'views/WelcomeView'],
    function (App, Backbone, Marionette, BabyPageView, MakeRequestView, HeaderView, ThankYouForRequestView, WelcomeView) {
        return Backbone.Marionette.Controller.extend({
            initialize:function (options) {
                App.headerRegion.show(new HeaderView());
            },

            welcome:function () {
                App.mainRegion.show(new WelcomeView());
            },

            babyPage:function (id) {
                if (id) {
                    App.mainRegion.show(new BabyPageView({babyId:id}));
                } else {
                    App.error("Please enter a valid Baby Code");
                    window.location = "#";
                }
            },

            makeRequest:function (id) {
                if (id) {
                    App.mainRegion.show(new MakeRequestView({babyId:id}));
                } else {
                    App.error("Please enter a valid Baby Code");
                    window.location = "#";
                }
            },

            thankYouForRequest:function () {
                App.mainRegion.show(new ThankYouForRequestView());
            }
        });
    });