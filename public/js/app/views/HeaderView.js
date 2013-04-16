define([ 'App', 'marionette', 'handlebars', 'text!templates/header.html'],
    function (App, Marionette, Handlebars, template) {
        //ItemView provides some default rendering logic
        return Marionette.ItemView.extend({
            template:Handlebars.compile(template),
            events: {
                "click #logOut" : "logOut"
            },

            logOut: function() {
                App.logOutUser();
            }
        });
    });