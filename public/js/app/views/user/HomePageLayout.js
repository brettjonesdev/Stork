define([ 'App', 'marionette', 'underscore', 'handlebars', 'models/BabyModel', 'collections/NewsItemCollection', 'hbs!template/user/homePage', 'views/LoadingView', 'views/user/UpdateStatusView', 'views/NewsFeedView'],
    function (App, Marionette, _, Handlebars, BabyModel, NewsItemCollection, template, LoadingView, UpdateStatusView, NewsFeedView) {
        return Marionette.Layout.extend({
            template:template,
            model: new BabyModel(),
            regions:{
                updateStatusRegion:"#updateStatus",
                newsFeedRegion:"#newsFeed"
            },

            onRender:function () {
                this.updateStatusRegion.show(new UpdateStatusView());
                this.newsFeedRegion.show(new LoadingView({loadTime:1000}));

                var that = this;
                var newsItemCollection = new NewsItemCollection();
                newsItemCollection.fetch({
                    data: {
                        babyCode: this.model.get("babyCode")
                    },
                    success: function(collection) {
                        that.newsFeedRegion.show(new NewsFeedView({collection:collection}));
                    },
                    error: App.syncError
                });
            }
        });
    });