require.config({
    baseUrl:"./js/app",
    // 3rd party script alias names (Easier to type "jquery" than "libs/jquery, etc")
    // probably a good idea to keep version numbers in the file names for updates checking
    paths:{
        // Core Libraries
        "jquery":"../libs/jquery",
        "jqueryui":"../libs/jqueryui",
        "underscore":"../libs/lodash",
        "backbone":"../libs/backbone",
        "marionette":"../libs/backbone.marionette",
        "handlebars":"../libs/handlebars-loader",
        "moment":"../libs/moment.min",
        "alertify":"../libs/alertify.min",
        "hbs":"../libs/hbs",
        "i18nprecompile":"../libs/i18nprecompile",
        "json2":"../libs/json2",

        // Plugins
        "backbone-validateAll":"../libs/plugins/backbone.validateAll",
        "backbone-validation":"../libs/plugins/backbone.validation",
        "backbone-deep-model":"../libs/plugins/deep-model",
        "bootstrap":"../libs/bootstrap",
        "bootstrap-timepicker":"../libs/plugins/bootstrap-timepicker.min",
        "bootstrap-datepicker":"../libs/plugins/bootstrap-datepicker",
        "text":"../libs/plugins/text"
    },
    // Sets the configuration for your third party scripts that are not AMD compatible
    shim:{
        "bootstrap":["jquery"],
        "bootstrap-timepicker":["bootstrap"],
        "bootstrap-datepicker":["bootstrap"],
        "jqueryui":["jquery"],
        "backbone":{
            "deps":["underscore"],
            // Exports the global window.Backbone object
            "exports":"Backbone"
        },
        "marionette":{
            "deps":["underscore", "backbone", "jquery"],
            // Exports the global window.Marionette object
            "exports":"Marionette"
        },
        "backbone-validateAll":["backbone"],
        "backbone-deep-model":["backbone"],
        "backbone-validation":["backbone", "backbone-validateAll"],
        "handlebars":{
            "exports":"Handlebars"
        }
    },
    // hbs config
    hbs: {
        disableI18n: false,        // This disables the i18n helper and
        // doesn't require the json i18n files (e.g. en_us.json)
        // (false by default)

        disableHelpers: false,     // When true, won't look for and try to automatically load
        // helpers (false by default)

/*
        helperPathCallback:       // Callback to determine the path to look for helpers
            function (name) {       // ('/template/helpers/'+name by default)
                return 'cs!' + name;
            },
*/

        templateExtension: "html", // Set the extension automatically appended to templates
        // ('hbs' by default)

        compileOptions: {}        // options object which is passed to Handlebars compiler
    }
});

// Includes Desktop Specific JavaScript files here (or inside of your Desktop router)
require(["App", "routers/AppRouter", "routers/SecureRouter",  "jquery", "bootstrap", "backbone-validateAll", "backbone-validation", "backbone-deep-model"],
    function (App, AppRouter, SecureRouter) {
        App.appRouter = new AppRouter();
        App.secureRouter = new SecureRouter();
        App.start();
    });