define(["App", "jquery", "underscore", "marionette", "handlebars", "util/ViewValidator", "backbone-deep-model"],
    function (App, $, _, Marionette, Handlebars, ViewValidator) {
        return Marionette.ItemView.extend({
            initialize:function () {
                this.formInit();
            },

            formInit: function() {
                _.bindAll(this);
                this.on("render", this.on_render);
                this.on("change form input", this.inputChanged);
                this.on("change form select", this.inputChanged);
            },

            events:{
                "change form input":"inputChanged",
                "change form select":"inputChanged"
            },

            //use bind/on_render not onRender so that implementing Views can use onRender without overriding this
            on_render:function () {
                //use jQuery to bind to form submit, since using events hash is flaky sometimes across browsers
                this.$("form").submit(this.trySubmit);
                ViewValidator.bindView(this);
                this.$("select").click(this.inputChanged).click();
            },

            inputChanged:function (event) {
                //update the model with attribute whose input changed, validating only that field
                var element = event.srcElement;
                if (!element) {
                    element = event.currentTarget;
                }
                var attrMap = {};
                attrMap[element.name] = element.value;
                //call set without validate:true to force model to update, then call validate for the attribute changed
                this.model.set(attrMap).validate(attrMap, {validateAll:false});
                console.log("model", this.model.toJSON());
            },

            trySubmit:function (event) {
                event.preventDefault();
                if (this.model.isValid(true)) {
                    this.save();
                } else {
                    console.log("model is not valid");
                }
            },

            save:function () {
                console.log("Saving:", this.model.toJSON());
                this.model.save(this.prepareSaveData(),
                    {
                        success:this.onSaveSuccess,
                        error:this.onSaveError
                    });
            },

            //override these methods as needed
            prepareSaveData:function() {
                return this.model.toJSON();
            },

            onSaveSuccess:function () {
                App.success("Saved");
            },

            onSaveError:function () {
                App.error("Error");
            }
        });
    });