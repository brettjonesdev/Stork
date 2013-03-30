define(['marionette', 'backbone', 'handlebars', 'text!templates/plainText.html'],
    function(Marionette, Backbone, Handlebars, template) {
    return Marionette.ItemView.extend({
        template: Handlebars.compile(template),
        initialize: function(options) {
            this.model = new Backbone.Model({
                text: options.text || "",
                subText: options.subText || "",
                cssClass: options.cssClass || "plainText"
            });
        }
    });
});