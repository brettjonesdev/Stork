define(["jquery", "underscore", "marionette", "handlebars", "util/ViewValidator"],
    function($, _, Marionette, Handlebars, ViewValidator) {
        return Marionette.ItemView.extend({
            initialize: function() {
                _.bindAll(this);
            },

            events: {
                "change form input" : "inputChanged"
            },

            onRender: function() {
                //use jQuery to bind to form submit, since using events hash is flaky sometimes across browsers
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
                    console.log( "model is not valid" );
                }
            },

            save: function() {
                console.log("Saving:", this.model.toJSON());
                this.model.save({
                    success: this.onSaveSuccess,
                    error: this.onSaveError
                });
            },

            onSaveSuccess: function() {
                //hook
            },

            onSaveError: function() {
                //hook
            }
        });
    });