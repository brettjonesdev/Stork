define(["jquery", "underscore", "marionette", "handlebars", "text!templates/editBaby.html", "models/BabyModel", "util/ViewValidator"],
    function($, _, Marionette, Handlebars, template, BabyModel, ViewValidator) {
    return Marionette.ItemView.extend({
        template: Handlebars.compile(template),
        model: new BabyModel(),
        initialize: function() {
            _.bindAll(this);
        },

        events: {
            "change form input" : "inputChanged"
        },
        onRender: function() {
            this.$("form").submit(this.trySubmit);
            ViewValidator.bindView(this);
        },

        inputChanged: function(event) {
            //update the model with attribute whose input changed, validating only that field
            var attrMap = {};
            attrMap[event.srcElement.name] = $(event.srcElement).val();
            //call set without validate:true to force model to update, then call validate for the attribute changed
            this.model.set(attrMap).validate(attrMap, {validateAll: false});
        },

        trySubmit: function(event) {
            event.preventDefault();
            if ( this.model.isValid(true) ) {
                this.save();
            } else {
                console.log( "error" );
            }
        },

        save: function() {
            console.log("Saving:", this.model.toJSON());
            this.model.save({
                success: function() {alert( "Success" )},
                error: function() {alert( "Error" )}
            });
        }
    });
});