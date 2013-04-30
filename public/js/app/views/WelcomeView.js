define([ 'marionette', 'underscore', 'handlebars', 'hbs!template/welcome', 'views/LoginView'],
    function (Marionette, _, Handlebars, template, LoginView) {
        return Marionette.Layout.extend({
            template:template,
            regions: {
                "logInRegion":"#logIn"
            },

            onRender:function () {
                this.logInRegion.show( new LoginView() );
                _.bindAll(this);
                this.$("form").submit(this.goBabyPage);
            },
            goBabyPage:function () {
                var code = this.$("#babyCode").val();
                window.location = "#babyPage/" + code;
                return false;
            }
        });
    });