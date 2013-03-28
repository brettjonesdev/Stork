define(['jquery', 'backbone', 'marionette', 'underscore', 'handlebars', 'alertify'],
    function ($, Backbone, Marionette, _, Handlebars, Alertify) {
        var App = new Backbone.Marionette.Application();

        //Organize Application into regions corresponding to DOM elements
        //Regions can contain views, Layouts, or subregions nested as necessary
        App.addRegions({
            headerRegion:"header",
            mainRegion:"#main"
        });

        function isMobile() {
            var ua = (navigator.userAgent || navigator.vendor || window.opera, window, window.document);
            return (/iPhone|iPod|iPad|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
        }

        App.mobile = isMobile();

        App.addInitializer(function (options) {
            Backbone.history.start();
        });


        //Create App-level logging methods that delegate to Alertify
        App.error = function(message) {
            if ( typeof message === "object" ) {
                message = ( message.message ? message.message : message.error );
            }
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