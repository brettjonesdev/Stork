define([ 'App', 'marionette', 'underscore', 'handlebars', 'models/BabyModel', 'collections/StatusCollection', 'collections/CommentsCollection', 'hbs!template/user/homePage', 'views/user/BabyInfoView', 'views/StatusFeedView', 'views/CommentsView', 'views/LoadingView', 'views/user/UpdateStatusView'],
    function (App, Marionette, _, Handlebars, BabyModel, StatusCollection, CommentsCollection, template, BabyInfoView, StatusFeedView, CommentsView, LoadingView, UpdateStatusView) {
        return Marionette.Layout.extend({
            template:template,
            regions:{
                babyInfoRegion:"#babyInfoRegion",
                statusFeedRegion:"#statusFeedRegion",
                commentsRegion:"#commentsRegion",
                photoRegion:"#photoRegion",
                needsRegion:"#needsRegion"
            },

            initialize:function () {
                if (!this.model) {
                    App.error("Must pass BabyPage a model");
                }
            },

            onRender:function () {
                this.babyInfoRegion.show(new BabyInfoView({model:this.model}));
                this.statusFeedRegion.show(new LoadingView({loadTime:300}));
                this.commentsRegion.show(new LoadingView({loadTime:300}));
                this.photoRegion.show(new LoadingView({loadTime:3000}));
                this.needsRegion.show(new LoadingView({loadTime:3000}));

                this.statusFeedRegion.show(new UpdateStatusView());

               /* var that = this;
                var statusCollection = new StatusCollection();
                statusCollection.fetch({
                    data: {
                        id: this.model.id
                    },
                    success: function(collection) {
                        that.statusFeedRegion.show(new StatusFeedView({collection:collection}));
                    },
                    error: App.syncError
                });

                var commentsCollection = new CommentsCollection();
                commentsCollection.fetch({
                    data: {
                        id: this.model.id
                    },
                    success: function(collection) {
                        that.commentsRegion.show(new CommentsView({collection:collection}));
                    },
                    error: App.syncError
                });*/
            }
        });
    });