define(["jquery", "underscore", "marionette", "handlebars", "text!templates/create.html", "models/CreateUserModel", "util/ViewValidator"],
    function($, _, Marionette, Handlebars, template, CreateUserModel, ViewValidator) {
    return Marionette.ItemView.extend({
        template: Handlebars.compile(template),
        model: new CreateUserModel(),
        initialize: function() {
            _.bindAll(this);
        },

        events: {
            "change #email" : "updateEmail"
        },
        onRender: function() {
            this.$("form").submit(this.trySubmit);
            ViewValidator.bindView(this);
        },
        updateEmail: function() {
            //should trigger validation for JUST email
            this.model.set("email", this.$("#email").val(), {validate: true, validateAll: false});
        },
        trySubmit: function(event) {
            event.preventDefault();
            var values = {};
            this.$("form input[type=text], form input[type=password]").each( function() {
                var attrName = $(this).attr("name");
                values[attrName] = $(this).val();
            });
            this.model.set(values, {validate: true});
            if ( this.model.isValid() ) {
                this.save();
            } else {
                console.log( "error" );
            }
        },
        save: function() {
            console.log("Saving:", this.model.toJSON());
        }
    });
});