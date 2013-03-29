define(['App', 'backbone', 'marionette', 'models/BabyModel', 'views/BabyPageLayout', 'views/MakeRequestView', 'views/HeaderView', 'views/ThankYouForRequestView', 'views/WelcomeView', 'views/CreateUserView', 'views/LoadingView', 'views/PlainTextView'],
    function (App, Backbone, Marionette, BabyModel, BabyPageLayout, MakeRequestView, HeaderView, ThankYouForRequestView, WelcomeView, CreateUserView, LoadingView, PlainTextView) {
        return Backbone.Marionette.Controller.extend({
            initialize:function (options) {
                App.headerRegion.show(new HeaderView());
            },

            welcome:function () {
                App.mainRegion.show(new WelcomeView());
            },

            create:function() {
                App.mainRegion.show(new CreateUserView());
            },

            checkYourEmail: function() {
                App.mainRegion.show(new PlainTextView({
                    text: "Please verify your email",
                    subText: "We have sent you an email with a link to confirm your email address and continue setting up your account."
                }));
            },

            verify: function(id) {
                App.mainRegion.show(new PlainTextView({
                    text: "authCode: " + id
                }));
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
                        error: App.syncError
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