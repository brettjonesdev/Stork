define(['marionette', 'backbone', 'handlebars', 'hbs!template/plainText'],
    function(Marionette, Backbone, Handlebars, template) {
    return Marionette.ItemView.extend({
        template: template,
        initialize: function(options) {
            this.model = new Backbone.Model({
                text: options.text || "",
                subText: options.subText || "",
                cssClass: options.cssClass || "plainText"
            });
        }
    });
});