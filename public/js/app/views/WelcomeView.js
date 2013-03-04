define([ 'marionette', 'underscore', 'handlebars', 'text!templates/welcome.html'],
    function (Marionette, _, Handlebars, template) {
        return Marionette.ItemView.extend({
            template:Handlebars.compile(template),
            onRender: function() {
                _.bindAll(this);
                this.$("form").submit(this.goBabyPage)
            },
            goBabyPage: function() {
                var code = this.$("#babyCode").val();
                window.location = "#babyPage/" + code;
                return false;
            }
        });
    });