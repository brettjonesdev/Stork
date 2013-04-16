define(['App', 'jquery', 'backbone', 'marionette', 'models/BabyModel', 'views/BabyPageLayout', 'views/MakeRequestView', 'views/HeaderView', 'views/ThankYouForRequestView', 'views/WelcomeView', 'views/CreateUserView', 'views/LoadingView', 'views/PlainTextView', 'views/EditPageView', 'views/LoginView'],
    function (App, $, Backbone, Marionette, BabyModel, BabyPageLayout, MakeRequestView, HeaderView, ThankYouForRequestView, WelcomeView, CreateUserView, LoadingView, PlainTextView, EditPageView, LoginView) {
        return Backbone.Marionette.Controller.extend({
            initialize:function (options) {
                App.headerRegion.show(new HeaderView());

                App.vent.on("loggedInUser", function(model) {
                    App.headerRegion.show(new HeaderView({model: model}))
                });
                App.vent.on("loggedOutUser", function() {
                    App.headerRegion.show(new HeaderView())
                });
            },

            welcome:function () {
                App.mainRegion.show(new WelcomeView());
            },

            logIn:function() {
                App.mainRegion.show(new LoginView());
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
                $.post( "/tempAuth", {
                    tempAuthCode: id
                }).done(function(res) {
                        window.location = "#editPage/" + res.userId;
                    }).fail(function() {
                        App.mainRegion.show(new PlainTextView({
                            cssClass: 'alert alert-error',
                            text: "Unable to verify this account.  Please try again.",
                            subText: "If you are still unable to verify your account, please contact us at at <a href='mailto:babypageapp@gmail.com'>babypageapp@gmail.com</a>"
                        }));
                    });

                App.mainRegion.show(new LoadingView({
                    message: "Verifying account...",
                    loadTime: 2000
                }));

            },

            babyPage:function (babyCode) {
                if (babyCode) {
                    App.mainRegion.show(new LoadingView({
                        loadTime: 500
                    }));

                    $.getJSON("/babyByCode/" + babyCode, function(data) {
                            console.log(data);
                            var babyModel = new BabyModel(data);
                            App.mainRegion.show(new BabyPageLayout({model:babyModel}));
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