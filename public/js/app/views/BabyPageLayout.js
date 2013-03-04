define([ 'App', 'marionette', 'underscore', 'handlebars', 'models/BabyModel', 'text!templates/babyPage.html', 'views/BabyInfoView', 'views/StatusFeedView', 'views/CommentsView'],
    function (App, Marionette, _, Handlebars, BabyModel, template, BabyInfoView, StatusFeedView, CommentsView) {
        return Marionette.Layout.extend({
            template:Handlebars.compile(template),
            regions:{
                babyInfoRegion:"#babyInfoRegion",
                statusFeedRegion:"#statusFeedRegion",
                commentsRegion:"#commentsRegion"
            },

            initialize:function () {
                if (!this.model) {
                    App.error("Must pass BabyPage a model");
                }
            },

            onRender:function () {
                this.babyInfoRegion.show(new BabyInfoView({model:this.model}));
                this.$(".ajax-loader").hide();
                this.$(".babyPage").show(100);
                this.statusFeedRegion.show(new StatusFeedView({model:this.model}));
                this.commentsRegion.show(new CommentsView({model:this.model}));
            }
        });
    });