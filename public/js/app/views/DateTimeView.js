define( [ 'App', 'underscore', 'marionette', 'handlebars', 'models/DateTimeModel', 'hbs!template/dateTime', 'util/ViewValidator', 'bootstrap', 'bootstrap-timepicker', 'bootstrap-datepicker'],
    function( App, _, Marionette, Handlebars, DateTimeModel, template, ViewValidator) {
        //ItemView provides some default rendering logic
        return Marionette.ItemView.extend( {
            template: template,
            model: new DateTimeModel(),

            initialize: function() {
                _.bindAll(this);
            },

            events: {
                "click .remove" : "close"
            },

            updateModel: function() {
                this.model.set({
                    date:this.$('[name=date]').val(),
                    from:this.$('[name=from]').val(),
                    to:this.$('[name=to]').val()
                }, {
                    silent:true
                });

                console.log( "Model updated", this.model.toJSON());
            },

            onRender: function() {
                this.$('input.date').datepicker({
                    autoclose:true,
                    todayHighlight:true
                });
                this.$('input.time').timepicker();

                this.$('input').change( this.updateModel );
                //update model with auto-values from datepicker and timepicker to keep consistent data
                this.updateModel();

                ViewValidator.bindView(this);
            },

            close: function() {
                App.trigger("dateTime:remove", this.model);
                this.remove();
            }
        });
    });