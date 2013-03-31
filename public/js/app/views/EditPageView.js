define([ 'App', 'marionette', 'views/base/FormView', 'models/UserModel', 'models/BabyModel', 'handlebars', 'text!templates/editPage.html'],
    function (App, Marionette,  FormView, UserModel, BabyModel, Handlebars, template) {
        return FormView.extend({
            template:Handlebars.compile(template),
            model: new BabyModel(),
            onSaveSuccess: function(a,b,c) {
                console.log(a,b,c);
            }
        });
    });