define(['jquery', 'backbone', 'marionette', 'underscore', 'handlebars', 'alertify'],
    function ($, Backbone, Marionette, _, Handlebars, Alertify) {
        var App = new Backbone.Marionette.Application();

        //Organize Application into regions corresponding to DOM elements
        //Regions can contain views, Layouts, or subregions nested as necessary
        App.addRegions({
            headerRegion:"header",
            mainRegion:"#main"
        });

        App.vent.on("loggedInUser", function(userModel) {
            this.userModel = userModel;
            console.log("logged in", userModel);
        });

        function isMobile() {
            var ua = (navigator.userAgent || navigator.vendor || window.opera);
            return (/iPhone|iPod|iPad|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
        }

        App.mobile = isMobile();

        App.addInitializer(function (options) {
            Backbone.history.start();
        });

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