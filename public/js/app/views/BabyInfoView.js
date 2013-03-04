define([ 'App', 'marionette', 'underscore', 'handlebars', 'models/BabyModel', 'text!templates/babyInfo.html'],
    function (App, Marionette, _, Handlebars, BabyModel, template) {
        return Marionette.ItemView.extend({
            template:Handlebars.compile(template),
            model: new BabyModel()
        });
    });