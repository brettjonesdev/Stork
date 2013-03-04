define([ 'marionette', 'handlebars', 'text!templates/thankYouForRequest.html'],
    function (Marionette, Handlebars, template) {
        return Marionette.ItemView.extend({
            template:Handlebars.compile(template)
        });
    });