define([ 'App', 'marionette', 'handlebars', 'text!templates/editAccount.html'],
    function (App, Marionette,  Handlebars, template) {
        return Marionette.ItemView.extend({
            template:Handlebars.compile(template)
        });
    });