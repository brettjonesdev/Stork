define([ 'App', 'views/base/FormView', 'marionette', 'underscore', 'handlebars', 'models/CommentModel', 'hbs!template/leaveComment'],
    function (App, FormView, Marionette, _, Handlebars, CommentModel, template) {
        return FormView.extend({
            template:template,
            model: new CommentModel(),
            events: function(){
                return _.extend({},FormView.prototype.events,{
                    "focus input":"showFromInfo"
                });
            },

            showFromInfo: function() {
                this.$(".fromInfo").show(100);
            },
            prepareSaveData:function() {
                this.model.set("babyCode", App.babyModel.get("babyCode"));
                console.log(this.model.toJSON());
                return this.model.toJSON();
            },
            onSaveSuccess: function(model) {
                App.success("Posted");
                this.trigger("leave-comment", model);
                this.model = new CommentModel();
                this.render();
            }
        });
    });