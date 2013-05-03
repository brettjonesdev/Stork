define([ 'App', 'marionette', 'underscore', 'handlebars', 'models/BabyModel', 'hbs!template/babyInfo'],
    function (App, Marionette, _, Handlebars, BabyModel, template) {
        return Marionette.ItemView.extend({
            template:template,
            model: new BabyModel()
        });
    });