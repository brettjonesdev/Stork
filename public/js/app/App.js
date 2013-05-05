define(['jquery', 'backbone', 'marionette', 'underscore', 'handlebars', 'alertify', 'models/UserModel', 'models/BabyModel'],
    function ($, Backbone, Marionette, _, Handlebars, Alertify, UserModel, BabyModel) {
        var App = new Backbone.Marionette.Application();

        //Organize Application into regions corresponding to DOM elements
        //Regions can contain views, Layouts, or subregions nested as necessary
        App.addRegions({
            headerRegion:"header",
            mainRegion:"#main"
        });

        App.logInUser = function(response, skipRedirect) {
            console.log("Logged In!", response);
            App.success("Logged In!");

            var userModel = new UserModel(response);
            var babyModel = new BabyModel(response.baby);

            document.cookie = "stork-email=" + userModel.get("email");
            this.userModel = userModel;
            this.babyModel = babyModel;

            if( skipRedirect !== true ) {
                window.location = "#babyPage/" + babyModel.get("babyCode");
            }

            App.vent.trigger("loggedInUser", userModel);
        };

        App.logOutUser = function() {
            App.userModel = undefined;
            App.babyModel = undefined;
            App.vent.trigger("loggedOutUser");
            deleteCookie("stork-email");
            $.post( "/logOut", {}).done(function(res) {
                    App.success("Logged out");
                    window.location = "#";
                }).fail(function() {
                    App.error( "Unable to log out" );
                });
        };

        function isMobile() {
            var ua = (navigator.userAgent || navigator.vendor || window.opera);
            return (/iPhone|iPod|iPad|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
        }

        App.mobile = isMobile();

        App.addInitializer(function (options) {
            if ( document.cookie.indexOf("stork-email") > -1 ) {
                //get user Info if logged in
                $.get("/userInfo").done(function(res) {
                    console.log(res);
                    App.logInUser(res, true);
                }).fail(function(){
                    console.log("Not logged in");

                }).always(function() {
                    Backbone.history.start();
                });
            } else {
                Backbone.history.start();
            }
        });

        function deleteCookie(name) {
            document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        }

        App.modelError = function(model, res, options) {
            var message = res.responseText;
            Alertify.error(message);
        };

        //Create App-level logging methods that delegate to Alertify
        App.error = function(message) {
            Alertify.error(message);
        };

        App.log = function(message) {
            Alertify.log(message);
        };

        App.success = function(message) {
            Alertify.success(message);
        };

        //Create App-level logging methods that delegate to Alertify
        App.syncError = function(model, xhr, options) {
            var message = "Ajax Error: " + options.url;
            console.log("Error", xhr);
            Alertify.error(message);
        };

        return App;
    });