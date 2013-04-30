define([ 'App', 'backbone', 'marionette', 'handlebars', 'views/DateTimeView', 'models/RequestModel', 'models/DateTimeModel', 'hbs!template/makeRequest', 'util/ViewValidator'],
    function (App, Backbone, Marionette, Handlebars, DateTimeView, RequestModel, DateTimeModel, template, ViewValidator) {
        return Marionette.CompositeView.extend({
            template:template,
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
                this.updateModel();
                var allValid = true;
                this.collection.each(function (model) {
                    var forceValidate = true;
                    if ( !model.isValid(forceValidate) ) {
                        allValid = false;
                    }
                });

                var forceValidate = true;
                if (this.model.isValid(forceValidate) && allValid) {
                    console.log("Valid and saving");
                    this.saveToServer();
                } else {
                    console.log("Not valid");
                }
            },

            saveToServer: function() {
                var data = _.extend(this.model.toJSON(), {dateTimes: this.collection.toJSON()});

                $.ajax({
                    url: "/makeRequest",
                    data: data,
                    type: "POST"
                }).done(function(data) {
                    window.location = "/#thankYouForRequest";
                }).fail(function(err) {
                    alert( err );
                });
            },

            initialize:function (options) {
                this.model.set('babyId', options.babyId);
                _.bindAll(this);
                this.addNewDateTime();

                //TODO replace with itemview:* style event bubbling
                App.on("dateTime:remove", this.removeDateTime, this);

            },

            onRender: function() {
                ViewValidator.bindView(this);
            },

            updateModel: function() {
                this.model.set({
                    name:this.$('[name=name]').val(),
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