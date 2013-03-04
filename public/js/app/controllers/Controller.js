define(['App', 'backbone', 'marionette', 'models/BabyModel', 'views/BabyPageLayout', 'views/MakeRequestView', 'views/HeaderView', 'views/ThankYouForRequestView', 'views/WelcomeView', 'views/LoadingView'],
    function (App, Backbone, Marionette, BabyModel, BabyPageLayout, MakeRequestView, HeaderView, ThankYouForRequestView, WelcomeView, LoadingView) {
        return Backbone.Marionette.Controller.extend({
            initialize:function (options) {
                App.headerRegion.show(new HeaderView());
            },

            welcome:function () {
                App.mainRegion.show(new WelcomeView());
            },

            babyPage:function (id) {
                if (id) {
                    App.mainRegion.show(new LoadingView({
                        loadTime: 500
                    }));
                    var model = new BabyModel({_id:id});
                    model.fetch({
                        success: function(updatedModel) {
                            App.mainRegion.show(new BabyPageLayout({model:updatedModel}));
                        },
                        error: function(model, xhr, options) {
                            App.error("Ajax error");
                        }
                    });
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