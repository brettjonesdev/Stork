define([ 'App', 'marionette', 'underscore', 'handlebars', 'models/StatusModel', 'hbs!template/status'],
    function (App, Marionette, _, Handlebars, StatusModel, template) {
        return Marionette.Layout.extend({
            template:template,
            model:new StatusModel()
        });
    });