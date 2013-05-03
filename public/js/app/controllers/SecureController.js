define(['App', 'jquery', 'backbone', 'marionette', 'views/user/EditPageView', 'views/user/HomePageLayout'],
    function (App, $, Backbone, Marionette, EditPageView, HomePageLayout) {
        return Backbone.Marionette.Controller.extend({
            initialize:function (options) {
                if ( this.checkAuthenticated() ) {
                    App.mainRegion.show(new HomePageLayout({model:App.babyModel}));
                }
            },

            editPage: function() {
                if ( this.checkAuthenticated() ) {
                    App.mainRegion.show(new EditPageView({model:App.babyModel}));
                }
            },

            home: function() {
                if ( this.checkAuthenticated() ) {
                    App.mainRegion.show(new HomePageLayout({model:App.babyModel}));
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