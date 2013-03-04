define([ 'marionette', 'underscore', 'handlebars', 'models/BabyModel', 'text!templates/babyPage.html'],
    function (Marionette, _, Handlebars, BabyModel, template) {
        return Marionette.ItemView.extend({
            template:Handlebars.compile(template),
            model: new BabyModel(),
            initialize: function(options) {
                this.model.set("_id", options.babyId);
                this.model.fetch({
                    success: this.render,
                    error: this.error
                });
            },

            error: function(err) {
                alert(err);
            }
        });
    });