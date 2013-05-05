define([ 'App', 'views/base/FormView', 'marionette', 'underscore', 'handlebars', 'models/StatusModel', 'hbs!template/user/updateStatus'],
    function (App, FormView, Marionette, _, Handlebars, StatusModel, template) {
        return FormView.extend({
            template:template,
            model: new StatusModel(),
            prepareSaveData:function() {
                this.model.set("babyCode", App.babyModel.get("babyCode"));
                console.log(this.model.toJSON());
                return this.model.toJSON();
            },
            onSaveSuccess: function(model) {
                App.success("Status Updated");
                this.trigger("status-update", model);
                this.model = new StatusModel();
                this.render();
            }
        });
    });