define([ 'App', 'backbone', 'marionette', 'views/base/FormView', 'models/LogInModel', 'handlebars', 'text!templates/logIn.html'],
    function (App, Backbone, Marionette, FormView, LogInModel, Handlebars, template) {
        return FormView.extend({
            template:Handlebars.compile(template),
            model: new LogInModel(),
            onSaveSuccess: App.logInUser
        });
    });