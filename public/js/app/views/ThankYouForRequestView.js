define([ 'marionette', 'handlebars', 'hbs!template/thankYouForRequest'],
    function (Marionette, Handlebars, template) {
        return Marionette.ItemView.extend({
            template:template
        });
    });