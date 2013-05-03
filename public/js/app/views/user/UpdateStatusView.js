define([ 'App', 'marionette', 'underscore', 'handlebars', 'models/StatusModel', 'hbs!template/user/updateStatus'],
    function (App, Marionette, _, Handlebars, StatusModel, template) {
        return Marionette.ItemView.extend({
            template:template,
            model: new StatusModel()
        });
    });