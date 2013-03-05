define([ 'App', 'marionette', 'underscore', 'handlebars', 'models/StatusModel', 'text!templates/status.html'],
    function (App, Marionette, _, Handlebars, StatusModel, template) {
        return Marionette.ItemView.extend({
            template:Handlebars.compile(template),
            model:new StatusModel()
        });
    });