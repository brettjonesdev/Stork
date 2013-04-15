define(['App', 'jquery', 'backbone', 'marionette', 'models/BabyModel', 'views/BabyPageLayout', 'views/MakeRequestView', 'views/HeaderView', 'views/ThankYouForRequestView', 'views/WelcomeView', 'views/CreateUserView', 'views/LoadingView', 'views/PlainTextView', 'models/UserAccountModel', 'views/EditPageView'],
    function (App, $, Backbone, Marionette, BabyModel, BabyPageLayout, MakeRequestView, HeaderView, ThankYouForRequestView, WelcomeView, CreateUserView, LoadingView, PlainTextView, UserAccountModel, EditPageView) {
        return Backbone.Marionette.Controller.extend({
            initialize:function (options) {
                App.headerRegion.show(new HeaderView());
            },

            editPage: function(userId) {
                var babyModel = new BabyModel({userId: userId});
                App.mainRegion.show(new EditPageView({model:babyModel}));
            },

            checkAuthenticated: function() {
                if ( !App.userModel || !App.userModel.get("authenticated") ) {
                    console.log("Not logged in");
                    window.location = "#logIn";
                }
            }
        });
    });