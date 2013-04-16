define(['App', 'jquery', 'backbone', 'marionette', 'models/BabyModel', 'views/BabyPageLayout', 'views/MakeRequestView', 'views/HeaderView', 'views/ThankYouForRequestView', 'views/WelcomeView', 'views/CreateUserView', 'views/LoadingView', 'views/PlainTextView', 'views/EditPageView'],
    function (App, $, Backbone, Marionette, BabyModel, BabyPageLayout, MakeRequestView, HeaderView, ThankYouForRequestView, WelcomeView, CreateUserView, LoadingView, PlainTextView, EditPageView) {
        return Backbone.Marionette.Controller.extend({
            initialize:function (options) {

            },

            editPage: function() {
                if ( this.checkAuthenticated() ) {
                    App.mainRegion.show(new EditPageView({model:App.babyModel}));
                }
            },

            checkAuthenticated: function() {
                if ( !App.userModel ) {
                    console.log("Not logged in");
                    window.location = "#logIn";
                    return false;
                }
                return true;
            }
        });
    });