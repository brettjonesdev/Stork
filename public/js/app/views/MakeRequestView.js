define([ 'App', 'backbone', 'marionette', 'handlebars', 'views/DateTimeView', 'models/RequestModel', 'models/DateTimeModel', 'text!templates/makeRequest.html', 'util/ViewValidator'],
    function (App, Backbone, Marionette, Handlebars, DateTimeView, RequestModel, DateTimeModel, template, ViewValidator) {
        return Marionette.CompositeView.extend({
            template:Handlebars.compile(template),
            model:new RequestModel(),
            collection:new Backbone.Collection([],{
                model:DateTimeModel
            }),

            itemView:DateTimeView,
            itemViewContainer:'#dateTimeContainer',

            events:{
                "click #addDateTime":"addNewDateTime",
                "click .submit":"validateAndSubmit"
            },

            validateAndSubmit:function () {
                var allValid = true;
                this.collection.each(function (model) {
                    model.validate();
                    allValid = false;
                });

                this.model.validate();
                if (allValid && this.model.isValid()) {
                    console.log("Valid and saving");
                } else {
                    console.log("Not valid");
                }
            },

            initialize:function () {
                _.bindAll(this);
                this.addNewDateTime();

                //TODO replace with itemview:* style event bubbling
                App.on("dateTime:remove", this.removeDateTime, this);

            },

            onRender: function() {
                this.$('[name=name],[name=email],[name=message]').change( this.updateModel );
                ViewValidator.bindView(this);
            },

            updateModel: function() {
                this.model.set({
                    name:this.$('[name=from]').val(),
                    email:this.$('[name=email]').val(),
                    message:this.$('[name=message]').val()
                }, {
                    silent: true
                });

                console.log( "Model updated", this.model.toJSON());
            },

            addNewDateTime:function () {
                this.collection.add(new DateTimeModel());
            },

            removeDateTime:function (model) {
                this.collection.remove(model);
            }
        });
    });