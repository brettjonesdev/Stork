define(['App', 'jquery', 'backbone', 'marionette', 'views/user/EditPageView', 'views/user/HomePageLayout'],
    function (App, $, Backbone, Marionette, EditPageView, HomePageLayout) {
        return Backbone.Marionette.Controller.extend({
            initialize:function (options) {
                var skipRedirect = true;
                if ( this.checkAuthenticated(true) ) {
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

            preview: function() {
                //TODO figure out how to show different views within HomePageLayout while maintaining loose coupling.
            },

            checkAuthenticated: function(skipRedirect) {
                if ( !App.userModel ) {
                    console.log("Not logged in");
                    if(!skipRedirect) {
                        window.location = "#logIn";
                    }
                    return false;
                }
                return true;
            }
        });
    });