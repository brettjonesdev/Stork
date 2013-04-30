define([ 'App', 'marionette', 'handlebars', 'hbs!template/header'],
    function (App, Marionette, Handlebars, template) {
        //ItemView provides some default rendering logic
        return Marionette.ItemView.extend({
            template:template,
            events: {
                "click #logOut" : "logOut"
            },

            logOut: function() {
                App.logOutUser();
            }
        });
    });