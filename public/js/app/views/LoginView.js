define([ 'App', 'backbone', 'marionette', 'views/base/FormView', 'models/LogInModel', 'handlebars', 'text!templates/logIn.html'],
    function (App, Backbone, Marionette, FormView, LogInModel, Handlebars, template) {
        return FormView.extend({
            template:Handlebars.compile(template),
            model: new LogInModel(),

            initialize: function() {
                this.formInit();
                $.ajax("/somethingAuthenticated", {
                    complete: function(a,b,c) {
                        console.log(a,b,c);
                    }
                });
            },
            onSaveSuccess: function(model) {
                console.log("Logged In!");
                App.success("Logged In!");
                App.vent.trigger("loggedInUser", model);
                window.location = "#babyPage/" + model.get( "babyCode" );
                $.ajax("/somethingAuthenticated", {
                    complete: function(a,b,c) {
                        console.log(a,b,c);
                    }
                });
            }
        });
    });