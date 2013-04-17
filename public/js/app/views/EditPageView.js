define([ 'App', 'marionette', 'views/base/FormView', 'models/UserModel', 'models/BabyModel', 'handlebars', 'text!templates/editPage.html'],
    function (App, Marionette,  FormView, UserModel, BabyModel, Handlebars, template) {
        return FormView.extend({
            template:Handlebars.compile(template),
            model: new BabyModel(),
            onSaveSuccess: function(a,b,c) {
                App.success("Changes Saved!");
                window.location = "#babyPage/" + this.model.get( "babyCode" );
            },

            onRender: function() {
                this.$('input.date').datepicker({
                    autoclose:true,
                    todayHighlight:true
                });

                this.$(".gender-select button").click(this.inputChanged);
                this.$(".gender-select button.active").click();
            }
        });
    });